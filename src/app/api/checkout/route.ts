import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { authorize, saveReport, requireCompletedReport, ReportNotReadyError } from '../../../lib/reports';
import { exclusive } from '../../../lib/storage';
import { checkoutOrigin } from '../../../lib/reportPayment';
import { checkoutAvailability, checkoutMatchesStripeMode, stripeCheckoutConfig } from '../../../lib/checkoutConfig';
export const dynamic = 'force-dynamic';
export async function POST(req: NextRequest) {
    try {
        const { token } = await req.json();
        const auth = await authorize(token || '');
        if (!auth || auth.role !== 'owner')
            return NextResponse.json({ error: 'Only the person who started this report can purchase it.' }, { status: 403 });
        requireCompletedReport(auth.record);
        const config = stripeCheckoutConfig();
        if (!config)
            return NextResponse.json({ code: 'CHECKOUT_UNAVAILABLE', error: checkoutAvailability().checkoutUnavailableReason }, { status: 503 });
        const origin = checkoutOrigin(req.url, req.headers.get('origin'));
        if (!origin)
            return NextResponse.json({ error: 'Checkout configuration is incomplete.' }, { status: 503 });
        const stripe = new Stripe(config.key, { timeout: 10000, maxNetworkRetries: 0 });
        return await exclusive('report:' + auth.record.id, async () => {
            const fresh = await authorize(token);
            if (!fresh)
                throw new Error('Expired report');
            const r = fresh.record;
            requireCompletedReport(r);
            if (r.refunded)
                return NextResponse.json({ error: 'This purchase was refunded. Start a new test to purchase a new report.' }, { status: 409 });
            if (r.paid)
                return NextResponse.json({ error: 'This report is already purchased. Refresh its status.' }, { status: 409 });
            if (r.checkoutId) {
                if (!checkoutMatchesStripeMode(r.checkoutId, config.testMode))
                    return NextResponse.json({ error: 'The site’s payment mode has changed. Start a new test to open a new checkout.' }, { status: 409 });
                const previous = await stripe.checkout.sessions.retrieve(r.checkoutId);
                if (previous.status === 'open' && previous.url)
                    return NextResponse.json({ url: previous.url });
                if (previous.status === 'complete')
                    return NextResponse.json({ error: 'Payment is being confirmed. Refresh the report shortly.' }, { status: 409 });
            }
            const attempt = r.checkoutId || 'first';
            const page = r.mode === 'friend' ? '/friend' : '/';
            const metadata = { reportId: r.id, mode: r.mode };
            const session = await stripe.checkout.sessions.create({
                mode: 'payment',
                // Keep the initial rollout to immediate card payments (including eligible card wallets).
                payment_method_types: ['card'],
                line_items: [{
                    quantity: 1,
                    price_data: {
                        currency: 'usd', unit_amount: r.price,
                        product_data: r.mode === 'friend'
                            ? { name: 'mixedsigns · Bestie full report for two', description: 'One purchase unlocks the report for both friends.' }
                            : { name: 'mixedsigns · Solo full report', description: 'Personalized evidence, seven-day observation plan and conversation scripts.' },
                    },
                }],
                success_url: origin + page + '?checkout=returned#access=' + token,
                cancel_url: origin + page + '?checkout=cancelled#access=' + token,
                metadata,
                payment_intent_data: { metadata },
            }, { idempotencyKey: r.id + ':' + attempt });
            if (session.status === 'expired' || !session.url)
                return NextResponse.json({ error: 'Checkout has expired. Start a new test to try again.' }, { status: 409 });
            r.checkoutId = session.id;
            r.checkoutUrl = session.url || undefined;
            await saveReport(r);
            return NextResponse.json({ url: session.url });
        });
    }
    catch (error) {
        if(error instanceof ReportNotReadyError)
            return NextResponse.json({code:'REPORT_NOT_READY',error:error.message},{status:409,headers:{'Cache-Control':'no-store'}});
        return NextResponse.json({ error: 'Checkout could not start. Please retry.' }, { status: 503 });
    }
}
