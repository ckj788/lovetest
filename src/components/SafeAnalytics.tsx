'use client';
import { Analytics } from '@vercel/analytics/react';
export function SafeAnalytics() { if (typeof window !== 'undefined' && ['localhost', '127.0.0.1'].includes(window.location.hostname))
    return null; return <Analytics beforeSend={event => ({ ...event, url: event.url.split('?')[0].split('#')[0] })}/>; }
