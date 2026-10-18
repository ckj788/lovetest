'use client';
import posthog from 'posthog-js';
import { PostHogProvider as Provider } from 'posthog-js/react';
if (typeof window !== 'undefined' && !['localhost', '127.0.0.1'].includes(window.location.hostname) && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, { api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com', person_profiles: 'identified_only', capture_pageview: false, capture_pageleave: false, autocapture: false, disable_session_recording: true, sanitize_properties: properties => { for (const key of Object.keys(properties)) {
            if (/url|referrer|pathname/i.test(key) && typeof properties[key] === 'string')
                properties[key] = properties[key].split('?')[0].split('#')[0];
        } return properties; } });
}
export function PostHogProvider({ children }: {
    children: React.ReactNode;
}) { return <Provider client={posthog}>{children}</Provider>; }
