import type Stripe from 'stripe';
import { saveReport, type ReportRecord } from './reports';
import { getRecord, putRecord } from './storage';

export function checkoutOrigin(requestUrl: string, browserOrigin?: string | null) {
    const configured = process.env.APP_URL?.trim()
        || (process.env.VERCEL_ENV === 'production' ? 'https://' + (process.env.VERCEL_PROJECT_PRODUCTION_URL || '') : '');
    const candidate = configured || (process.env.NODE_ENV === 'production' ? '' : requestUrl);
    if (!candidate) return null;
    try {
        const url = new URL(candidate);
        const { origin, protocol, username, password } = url;
        if (username || password || (protocol !== 'https:' && !(protocol === 'http:' && process.env.NODE_ENV !== 'production'))) return null;
        // Next can normalize 127.0.0.1 to localhost. Keep the same browser origin on a local return.
        const loopbackHosts = ['localhost', '127.0.0.1', '[::1]'];
        if (!configured && process.env.NODE_ENV === 'development' && browserOrigin && loopbackHosts.includes(url.hostname)) {
            const browserUrl = URL.canParse(browserOrigin) ? new URL(browserOrigin) : null;
            if (browserUrl && loopbackHosts.includes(browserUrl.hostname)
                && browserUrl.protocol === protocol && browserUrl.port === url.port) return browserUrl.origin;
        }
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
