import { NextRequest, NextResponse } from 'next/server';
import {
  generateSessionId,
  generateSecureToken,
  saveDuoSession,
  getDuoSessionByToken,
  DuoSessionRecord,
} from '@/lib/storage';

export const dynamic = 'force-dynamic';

// 7 days in milliseconds
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { mode, answers, referralSource } = body;

    if (!mode || !['talking', 'couples', 'friend'].includes(mode)) {
      return NextResponse.json({ error: 'Valid mode is required (talking, couples, friend)' }, { status: 400 });
    }

    if (!answers || typeof answers !== 'object' || Object.keys(answers).length === 0) {
      return NextResponse.json({ error: 'Partner 1 answers are required' }, { status: 400 });
    }

    const sessionId = generateSessionId();
    const partner1Token = generateSecureToken(16);
    const partner2Token = generateSecureToken(16);
    const now = Date.now();

    const newSession: DuoSessionRecord = {
      id: sessionId,
      mode,
      partner1Token,
      partner2Token,
      partner1Answers: answers,
      status: 'pending',
      isPaid: mode === 'friend' ? true : false, // Friend mode is free
      referralSource: referralSource || 'direct',
      createdAt: now,
      updatedAt: now,
      expiresAt: now + SESSION_TTL_MS,
    };

    await saveDuoSession(newSession);

    const origin = req.headers.get('origin') || 'http://localhost:3000';
    const basePath = mode === 'friend' ? '/friend' : '/dual';
    const inviteUrl = `${origin}${basePath}?session=${sessionId}&token=${partner2Token}&p=2`;

    return NextResponse.json({
      success: true,
      sessionId,
      partner1Token,
      partner2Token,
      inviteUrl,
      mode,
    });
  } catch (err: any) {
    console.error('Error creating duo session:', err);
    return NextResponse.json({ error: 'Failed to create duo session' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json({ error: 'Access token is required' }, { status: 400 });
    }

    const tokenLookup = await getDuoSessionByToken(token);
    if (!tokenLookup) {
      return NextResponse.json({ error: 'Session not found or invalid token' }, { status: 404 });
    }

    const { session, role } = tokenLookup;

    if (session.status === 'expired') {
      return NextResponse.json({ status: 'expired', error: 'This session has expired' }, { status: 410 });
    }

    if (session.status === 'deleted') {
      return NextResponse.json({ status: 'deleted', error: 'This session was deleted' }, { status: 410 });
    }

    // If partner 2 hasn't answered yet
    if (session.status === 'pending') {
      return NextResponse.json({
        sessionId: session.id,
        status: 'pending',
        mode: session.mode,
        role,
        isPaid: session.isPaid,
        partner1Completed: true,
        partner2Completed: false,
        // CRITICAL PRIVACY: Never expose partner1Answers to partner2 before partner2 completes!
        partner1Answers: role === 'partner1' ? session.partner1Answers : undefined,
      });
    }

    // If session is completed, both answers can be revealed for scoring
    return NextResponse.json({
      sessionId: session.id,
      status: 'completed',
      mode: session.mode,
      role,
      isPaid: session.isPaid,
      partner1Answers: session.partner1Answers,
      partner2Answers: session.partner2Answers,
    });
  } catch (err: any) {
    console.error('Error fetching duo session:', err);
    return NextResponse.json({ error: 'Failed to fetch session' }, { status: 500 });
  }
}
