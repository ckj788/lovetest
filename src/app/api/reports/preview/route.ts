import { NextResponse } from 'next/server';

// Older cached pages may still call the retired demo endpoint.
export async function POST() {
    return NextResponse.json(
        { error: 'Refresh the page to use Stripe Checkout.' },
        { status: 410, headers: { 'Cache-Control': 'no-store' } },
    );
}
