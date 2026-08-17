import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';

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
    const { archetypeName, archetypeId } = body;

    const origin = req.headers.get('origin') || req.headers.get('referer')?.replace(/\/$/, '') || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `mixedsigns · Deep Signal Diagnosis Report`,
              description: `Full behavioral breakdown & 7-day power playbook for ${archetypeName || 'Your Connection'}`,
            },
            unit_amount: 399, // $3.99 USD in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/?unlocked=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
      metadata: {
        archetypeId: archetypeId || 'general',
        archetypeName: archetypeName || 'General',
      },
    });

    return NextResponse.json({ url: session.url, id: session.id });
  } catch (err: any) {
    console.error('Stripe checkout error:', err);
    return NextResponse.json(
      { error: err.message || 'Payment session creation failed' },
      { status: 500 }
    );
  }
}
