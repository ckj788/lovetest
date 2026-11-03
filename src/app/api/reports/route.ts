import { NextRequest, NextResponse } from 'next/server';
import { authorize, createReport, reportView, submitGuest, validAnswers } from '../../../lib/reports';
export const dynamic = 'force-dynamic';
const json = (data: unknown, status = 200) => NextResponse.json(data, { status, headers: { 'Cache-Control': 'no-store' } });
export async function POST(req: NextRequest) { try {
    const body = await req.json();
    if (!['solo', 'friend'].includes(body.mode) || !validAnswers(body.mode, body.answers))
        return json({ error: 'Please answer all eight questions with valid choices.' }, 400);
    if (body.token) {
        if (body.mode !== 'friend')
            return json({ error: 'Invalid mode' }, 400);
        return json(await submitGuest(body.token, body.answers));
    }
    const record = await createReport(body.mode, body.answers);
    return json({ token: record.ownerToken, ...reportView(record, 'owner') });
}
catch {
    return json({ error: 'Unable to save your answers. Please retry.' }, 503);
} }
export async function GET(req: NextRequest) { try {
    const token = req.headers.get('authorization')?.replace(/^Bearer /, '') || '';
    const auth = await authorize(token);
    return auth ? json(reportView(auth.record, auth.role)) : json({ error: 'This private link is invalid or expired.' }, 410);
}
catch {
    return json({ error: 'Unable to load your report. Please retry.' }, 503);
} }
