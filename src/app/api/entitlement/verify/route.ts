import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getDuoSessionById, saveDuoSession, getEntitlement, saveEntitlement } from '@/lib/storage';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { type, targetId, checkoutSessionId } = body;

    if (!type || !targetId) {
      return NextResponse.json({ error: 'Type and targetId are required' }, { status: 400 });
    }

    if (type === 'duo') {
      const duoSession = await getDuoSessionById(targetId);
      if (!duoSession) {
        return NextResponse.json({ error: 'Duo session not found' }, { status: 404 });
      }

      if (duoSession.isPaid) {
        return NextResponse.json({ isPaid: true, sessionId: duoSession.id });
      }

      // If not yet marked paid in database, but user returned with checkoutSessionId:
      if (checkoutSessionId && process.env.STRIPE_SECRET_KEY) {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
          apiVersion: '2024-06-20' as any,
        });

        const stripeSession = await stripe.checkout.sessions.retrieve(checkoutSessionId);
        if (
          stripeSession &&
          stripeSession.payment_status === 'paid' &&
          stripeSession.metadata?.targetId === targetId
        ) {
          duoSession.isPaid = true;
          duoSession.stripeSessionId = stripeSession.id;
          duoSession.amountPaid = stripeSession.amount_total || 999;
          duoSession.updatedAt = Date.now();
          await saveDuoSession(duoSession);
          return NextResponse.json({ isPaid: true, sessionId: duoSession.id });
        }
      }

      return NextResponse.json({ isPaid: false });
    } else {
      // Solo Entitlement
      const entitlement = await getEntitlement(targetId);
      if (entitlement && entitlement.isPaid) {
        return NextResponse.json({ isPaid: true, resultId: targetId });
      }

      // Verify directly with Stripe session if available
      if (checkoutSessionId && process.env.STRIPE_SECRET_KEY) {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
          apiVersion: '2024-06-20' as any,
        });

        const stripeSession = await stripe.checkout.sessions.retrieve(checkoutSessionId);
        if (
          stripeSession &&
          stripeSession.payment_status === 'paid' &&
          stripeSession.metadata?.targetId === targetId
        ) {
          await saveEntitlement({
            id: targetId,
            type: 'solo',
            isPaid: true,
            stripeSessionId: stripeSession.id,
            amountPaid: stripeSession.amount_total || 799,
            createdAt: Date.now(),
            updatedAt: Date.now(),
          });
          return NextResponse.json({ isPaid: true, resultId: targetId });
        }
      }

      return NextResponse.json({ isPaid: false });
    }
  } catch (err: any) {
    console.error('Error verifying entitlement:', err);
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}
