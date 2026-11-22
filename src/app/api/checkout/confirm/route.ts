import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { authorize, reportView } from '../../../../lib/reports';
import { exclusive } from '../../../../lib/storage';
import { fulfillCheckout } from '../../../../lib/reportPayment';
import { stripeCheckoutConfig } from '../../../../lib/checkoutConfig';

export const dynamic = 'force-dynamic';
const json = (data: unknown, status = 200) => NextResponse.json(data, {
    status, headers: { 'Cache-Control': 'no-store' },
});

export async function POST(req: NextRequest) {
    const body = await req.json().catch(() => null);
    const token = typeof body?.token === 'string' ? body.token : '';
    try {
        const auth = await authorize(token);
        if (!auth || auth.role !== 'owner') return json({ error: 'Open the initiating person’s private report link.' }, 403);
        if (!auth.record.checkoutId) return json({ error: 'No checkout has been started for this report.' }, 409);

        return await exclusive('report:' + auth.record.id, async () => {
            const fresh = await authorize(token);
            if (!fresh) return json({ error: 'This report link has expired.' }, 410);
            const report = fresh.record;
            if (!report.paid && !report.refunded && report.checkoutId) {
                const config = stripeCheckoutConfig();
                if (!config) return json({ error: 'Payment confirmation is temporarily unavailable.' }, 503);
                const stripe = new Stripe(config.key, { timeout: 8000, maxNetworkRetries: 0 });
                const session = await stripe.checkout.sessions.retrieve(report.checkoutId);
                await fulfillCheckout(report, session);
            }
            return json(reportView(report, 'owner'));
        });
    } catch {
        return json({ error: 'Payment confirmation is temporarily unavailable. Please refresh the report shortly.' }, 503);
    }
}
