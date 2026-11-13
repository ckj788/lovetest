import { NextResponse } from 'next/server';
import { getRecord } from '../../../../lib/storage';
import { StorageConfigurationError } from '../../../../lib/storageConfig';

export const dynamic = 'force-dynamic';
export async function GET() {
    try {
        // Check configuration, authentication and reachability without creating a report.
        await getRecord('report:availability');
        return NextResponse.json({ available: true }, { headers: { 'Cache-Control': 'no-store' } });
    } catch (error) {
        const setup = error instanceof StorageConfigurationError;
        return NextResponse.json({
            available: false,
            code: setup ? 'STORAGE_NOT_CONFIGURED' : 'STORAGE_UNAVAILABLE',
            error: setup
                ? 'Friend invitations are not ready yet. The site owner needs to connect shared storage. Please come back shortly, or try Solo now.'
                : 'Friend invitations are temporarily unavailable. Please retry in a moment.',
        }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
    }
}
