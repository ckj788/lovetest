import { NextRequest, NextResponse } from 'next/server';
import { getDuoSessionByToken, saveDuoSession } from '@/lib/storage';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { token, answers } = body;

    if (!token) {
      return NextResponse.json({ error: 'Access token is required' }, { status: 400 });
    }

    if (!answers || typeof answers !== 'object' || Object.keys(answers).length === 0) {
      return NextResponse.json({ error: 'Partner answers are required' }, { status: 400 });
    }

    const tokenLookup = await getDuoSessionByToken(token);
    if (!tokenLookup) {
      return NextResponse.json({ error: 'Session not found or invalid token' }, { status: 404 });
    }

    const { session, role } = tokenLookup;

    if (role !== 'partner2') {
      return NextResponse.json({ error: 'Only Partner 2 can submit via this endpoint' }, { status: 403 });
    }

    if (session.status === 'completed' && session.partner2Answers) {
      return NextResponse.json({
        success: true,
        message: 'Partner 2 has already submitted',
        sessionId: session.id,
        status: 'completed',
        isPaid: session.isPaid,
      });
    }

    if (session.status === 'expired') {
      return NextResponse.json({ error: 'Session has expired' }, { status: 410 });
    }

    // Save partner 2 answers and mark as completed
    session.partner2Answers = answers;
    session.status = 'completed';
    session.updatedAt = Date.now();

    await saveDuoSession(session);

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      status: 'completed',
      isPaid: session.isPaid,
    });
  } catch (err: any) {
    console.error('Error submitting partner 2 answers:', err);
    return NextResponse.json({ error: 'Submission failed' }, { status: 500 });
  }
}
