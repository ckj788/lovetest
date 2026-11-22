import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getRecord, putRecord, exclusive } from '../../../../lib/storage';
import { ReportRecord, saveReport } from '../../../../lib/reports';
import { fulfillCheckout } from '../../../../lib/reportPayment';
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
            if (id && s.payment_status === 'paid') {
                await exclusive('report:' + id, async () => {
                    const report = await getRecord<ReportRecord>('report:' + id);
                    if (!report || report.expiresAt <= Date.now()) return;
                    await fulfillCheckout(report, s);
                });
            }
        }
        if (event.type === 'charge.refunded') {
            const c = event.data.object as Stripe.Charge;
            const intent = typeof c.payment_intent === 'string' ? c.payment_intent : '';
            if (intent && c.refunded) {
                // Record full refunds even when the Checkout event has not arrived yet.
                await putRecord('payment-refunded:' + intent, true);
                const id = await getRecord<string>('payment-report:' + intent);
                if (id) await exclusive('report:' + id, async () => {
                    const report = await getRecord<ReportRecord>('report:' + id);
                    if (!report || report.expiresAt <= Date.now() || report.paymentIntent !== intent || report.refunded) return;
                    report.refunded = true;
                    report.paid = false;
                    await saveReport(report);
                });
            }
        }
        return NextResponse.json({ received: true });
    }
    catch {
        return NextResponse.json({ error: 'Webhook processing failed; retry required' }, { status: 500 });
    }
}
