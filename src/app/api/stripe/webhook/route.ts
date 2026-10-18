import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getDuoSessionById, saveDuoSession, saveEntitlement } from '@/lib/storage';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      return NextResponse.json({ error: 'Stripe secret key not configured' }, { status: 500 });
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: '2024-06-20' as any,
    });

    const bodyText = await req.text();
    const sig = req.headers.get('stripe-signature');
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event: Stripe.Event;

    if (webhookSecret && sig) {
      try {
        event = stripe.webhooks.constructEvent(bodyText, sig, webhookSecret);
      } catch (err: any) {
        console.error('Webhook signature verification failed:', err.message);
        return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
      }
    } else {
      // In development without webhook secret, parse payload safely
      try {
        event = JSON.parse(bodyText);
      } catch (e) {
        return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
      }
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const metadata = session.metadata || {};
      const { type, targetId, priceInCents } = metadata;

      if (type === 'duo' && targetId) {
        const duoSession = await getDuoSessionById(targetId);
        if (duoSession) {
          duoSession.isPaid = true;
          duoSession.stripeSessionId = session.id;
          duoSession.amountPaid = priceInCents ? parseInt(priceInCents, 10) : (session.amount_total || 999);
          duoSession.updatedAt = Date.now();
          await saveDuoSession(duoSession);
          console.log(`[Stripe Webhook] Duo session ${targetId} unlocked successfully.`);
        }
      } else if (type === 'solo' && targetId) {
        await saveEntitlement({
          id: targetId,
          type: 'solo',
          isPaid: true,
          stripeSessionId: session.id,
          amountPaid: priceInCents ? parseInt(priceInCents, 10) : (session.amount_total || 799),
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });
        console.log(`[Stripe Webhook] Solo entitlement for ${targetId} unlocked successfully.`);
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('Error handling webhook:', err);
    return NextResponse.json({ error: 'Webhook processing error' }, { status: 500 });
  }
}
