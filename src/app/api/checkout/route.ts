import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getDuoSessionById } from '@/lib/storage';

export const dynamic = 'force-dynamic';

// Allowed server-side prices (in cents)
const ALLOWED_SOLO_PRICES = [599, 799, 999]; // $5.99, $7.99 (default), $9.99
const ALLOWED_DUO_PRICES = [999, 1299, 1499]; // $9.99 (default), $12.99, $14.99

export async function POST(req: NextRequest) {
  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      return NextResponse.json(
        { error: 'Stripe secret key is not configured in environment variables' },
        { status: 500 }
      );
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: '2024-06-20' as any,
    });

    const body = await req.json().catch(() => ({}));
    const { type = 'solo', targetId, priceInCents, token } = body;

    const origin = req.headers.get('origin') || req.headers.get('referer')?.replace(/\/$/, '') || 'http://localhost:3000';

    if (type === 'duo') {
      if (!targetId) {
        return NextResponse.json({ error: 'Session ID is required for Duo checkout' }, { status: 400 });
      }

      const session = await getDuoSessionById(targetId);
      if (!session) {
        return NextResponse.json({ error: 'Duo session not found' }, { status: 404 });
      }

      if (session.isPaid) {
        return NextResponse.json({ error: 'This session is already unlocked' }, { status: 400 });
      }

      const unitAmount = ALLOWED_DUO_PRICES.includes(priceInCents) ? priceInCents : 999;
      const displayPrice = (unitAmount / 100).toFixed(2);

      const checkoutSession = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `mixedsigns · Duo Blind Match Full Compatibility Blueprint`,
                description: `Full access for both partners: Complete answers, gap analysis, and conversation guides.`,
              },
              unit_amount: unitAmount,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${origin}/dual?session=${targetId}${token ? `&token=${token}` : ''}&checkout_id={CHECKOUT_SESSION_ID}&paid=success`,
        cancel_url: `${origin}/dual?session=${targetId}${token ? `&token=${token}` : ''}&canceled=true`,
        metadata: {
          type: 'duo',
          targetId,
          priceInCents: unitAmount.toString(),
        },
      });

      return NextResponse.json({ url: checkoutSession.url, id: checkoutSession.id });
    } else {
      // Solo Mode Checkout
      const resultId = targetId || `solo_${Date.now()}`;
      const unitAmount = ALLOWED_SOLO_PRICES.includes(priceInCents) ? priceInCents : 799;

      const checkoutSession = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `mixedsigns · Deep Signal Diagnosis & 7-Day Action Plan`,
                description: `Evidence-based behavioral breakdown, 7-day proof check, and word-for-word scripts.`,
              },
              unit_amount: unitAmount,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${origin}/?result_id=${resultId}&checkout_id={CHECKOUT_SESSION_ID}&paid=success`,
        cancel_url: `${origin}/?result_id=${resultId}&canceled=true`,
        metadata: {
          type: 'solo',
          targetId: resultId,
          priceInCents: unitAmount.toString(),
        },
      });

      return NextResponse.json({ url: checkoutSession.url, id: checkoutSession.id, resultId });
    }
  } catch (err: any) {
    console.error('Stripe checkout error:', err);
    return NextResponse.json(
      { error: err.message || 'Payment session creation failed' },
      { status: 500 }
    );
  }
}
