import type Stripe from 'stripe';
import { saveReport, type ReportRecord } from './reports';
import { getRecord, putRecord } from './storage';

export function checkoutOrigin(requestUrl: string) {
    const configured = process.env.APP_URL?.trim()
        || (process.env.VERCEL_ENV === 'production' ? 'https://' + (process.env.VERCEL_PROJECT_PRODUCTION_URL || '') : '');
    const candidate = configured || (process.env.NODE_ENV === 'production' ? '' : requestUrl);
    if (!candidate) return null;
    try {
        const { origin, protocol, username, password } = new URL(candidate);
        if (username || password || (protocol !== 'https:' && !(protocol === 'http:' && process.env.NODE_ENV !== 'production'))) return null;
        return origin;
    } catch {
        return null;
    }
}

export function matchesCheckout(report: ReportRecord, session: Stripe.Checkout.Session) {
    return report.checkoutId === session.id
        && session.metadata?.reportId === report.id
        && session.metadata?.mode === report.mode
        && session.mode === 'payment'
        && session.currency === 'usd'
        && session.amount_total === report.price;
}

// Both callers hold the report lock and verify the session belongs to this report.
export async function fulfillCheckout(report: ReportRecord, session: Stripe.Checkout.Session) {
    if (!matchesCheckout(report, session)) throw new Error('Checkout binding mismatch');
    if (session.status !== 'complete' || session.payment_status !== 'paid' || report.refunded || report.paid) return;
    const intent = typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id;
    if (!intent) throw new Error('Paid checkout missing payment intent');

    await putRecord('payment-report:' + intent, report.id);
    report.paymentIntent = intent;
    report.refunded = (await getRecord<boolean>('payment-refunded:' + intent)) === true;
    report.paid = !report.refunded;
    await saveReport(report);
}
