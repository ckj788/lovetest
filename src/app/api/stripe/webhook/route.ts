import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getRecord, putRecord, exclusive } from '../../../../lib/storage';
import { ReportRecord, saveReport } from '../../../../lib/reports';
export const dynamic = 'force-dynamic';
export async function POST(req: NextRequest) {
    if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET)
        return NextResponse.json({ error: 'Webhook not configured' }, { status: 503 });
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(await req.text(), req.headers.get('stripe-signature') || '', process.env.STRIPE_WEBHOOK_SECRET);
    }
    catch {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }
    try {
        if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
            const s = event.data.object as Stripe.Checkout.Session;
            const id = s.metadata?.reportId;
            if (id)
                await exclusive('report:' + id, async () => { const r = await getRecord<ReportRecord>('report:' + id); if (!r || r.expiresAt <= Date.now())
                    return; if (r.checkoutId !== s.id || s.payment_status !== 'paid' || s.mode !== 'payment' || s.currency !== 'usd' || s.amount_total !== r.price || s.metadata?.mode !== r.mode)
                    throw new Error('Checkout binding mismatch'); if (typeof s.payment_intent === 'string') {
                    r.paymentIntent = s.payment_intent;
                    await putRecord('payment-report:' + s.payment_intent, id);
                } if (!r.refunded) {
                    r.paid = true;
                    await saveReport(r);
                } });
        }
        if (event.type === 'charge.refunded') {
            const c = event.data.object as Stripe.Charge;
            const intent = typeof c.payment_intent === 'string' ? c.payment_intent : '';
            const id = await getRecord<string>('payment-report:' + intent);
            if (id)
                await exclusive('report:' + id, async () => { const r = await getRecord<ReportRecord>('report:' + id); if (r) {
                    r.refunded = true;
                    r.paid = false;
                    await saveReport(r);
                } });
        }
        return NextResponse.json({ received: true });
    }
    catch {
        return NextResponse.json({ error: 'Webhook processing failed; retry required' }, { status: 500 });
    }
}
