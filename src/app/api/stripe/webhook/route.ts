import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getRecord, putRecord, exclusive } from '../../../../lib/storage';
import { ReportRecord, saveReport } from '../../../../lib/reports';
import { fulfillCheckout } from '../../../../lib/reportPayment';
import { checkoutMatchesStripeMode, stripeWebhookSecrets } from '../../../../lib/checkoutConfig';
export const dynamic = 'force-dynamic';
export async function POST(req: NextRequest) {
    const secrets = stripeWebhookSecrets();
    if (!secrets.live && !secrets.test)
        return NextResponse.json({ error: 'Webhook not configured' }, { status: 503 });
    let event: Stripe.Event;
    try {
        const payload = await req.text();
        const { livemode } = JSON.parse(payload);
        // The body selects a mode-specific secret. Only the verified event is processed.
        const secret = livemode === true ? secrets.live : livemode === false ? secrets.test : undefined;
        if (!secret) return NextResponse.json({ error: 'Webhook mode not configured' }, { status: 400 });
        event = Stripe.webhooks.constructEvent(payload, req.headers.get('stripe-signature') || '', secret);
    }
    catch {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }
    try {
        if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
            const s = event.data.object as Stripe.Checkout.Session;
            const id = s.metadata?.reportId;
            if (id && s.payment_status === 'paid') {
                if (!checkoutMatchesStripeMode(s.id, !event.livemode))
                    return NextResponse.json({ error: 'Checkout mode mismatch' }, { status: 400 });
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
