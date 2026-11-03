import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { authorize, saveReport } from '../../../lib/reports';
import { exclusive } from '../../../lib/storage';
export const dynamic = 'force-dynamic';
export async function POST(req: NextRequest) {
    try {
        const { token } = await req.json();
        const auth = await authorize(token || '');
        if (!auth || auth.role !== 'owner')
            return NextResponse.json({ error: 'Only the person who started this report can purchase it.' }, { status: 403 });
        if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET)
            return NextResponse.json({ error: 'Checkout is not configured yet. Your answers and invitation are saved.' }, { status: 503 });
        const origin = process.env.APP_URL || (process.env.NODE_ENV !== 'production' ? new URL(req.url).origin : '');
        if (!origin)
            return NextResponse.json({ error: 'Checkout configuration is incomplete.' }, { status: 503 });
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        return await exclusive('report:' + auth.record.id, async () => {
            const fresh = await authorize(token);
            if (!fresh)
                throw new Error('Expired report');
            const r = fresh.record;
            if (r.paid)
                return NextResponse.json({ error: 'This report is already purchased. Refresh its status.' }, { status: 409 });
            if (r.checkoutId) {
                const previous = await stripe.checkout.sessions.retrieve(r.checkoutId);
                if (previous.status === 'open' && previous.url)
                    return NextResponse.json({ url: previous.url });
                if (previous.status === 'complete')
                    return NextResponse.json({ error: 'Payment is being confirmed. Refresh the report shortly.' }, { status: 409 });
            }
            const attempt = r.checkoutId || 'first';
            const page = r.mode === 'friend' ? '/friend' : '/';
            const session = await stripe.checkout.sessions.create({ mode: 'payment', line_items: [{ price_data: { currency: 'usd', unit_amount: r.price, product_data: { name: r.mode === 'friend' ? 'mixedsigns · Bestie full reveal for two' : 'mixedsigns · Solo full action plan', description: r.mode === 'friend' ? 'One purchase for both people. Full report opens after both complete 8 questions.' : 'Personalized evidence, seven-day observation plan and conversation scripts.' } }, quantity: 1 }], success_url: origin + page + '?checkout=returned#access=' + token, cancel_url: origin + page + '?checkout=cancelled#access=' + token, metadata: { reportId: r.id, mode: r.mode } }, { idempotencyKey: r.id + ':' + attempt });
            r.checkoutId = session.id;
            r.checkoutUrl = session.url || undefined;
            await saveReport(r);
            return NextResponse.json({ url: session.url });
        });
    }
    catch {
        return NextResponse.json({ error: 'Checkout could not start. Please retry.' }, { status: 503 });
    }
}
