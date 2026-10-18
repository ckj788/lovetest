import posthog from 'posthog-js';

export type FunnelEvent =
  | 'home_view'
  | 'mode_selected'
  | 'quiz_started'
  | 'question_answered'
  | 'quiz_completed'
  | 'free_result_viewed'
  | 'paywall_viewed'
  | 'checkout_started'
  | 'payment_completed'
  | 'report_viewed'
  | 'share_card_generated'
  | 'share_clicked'
  | 'duo_session_created'
  | 'partner_invite_copied'
  | 'partner_joined'
  | 'partner_completed'
  | 'friend_invite_created'
  | 'friend_joined'
  | 'friend_result_viewed';

interface EventProperties {
  mode?: 'solo' | 'duo_talking' | 'duo_couples' | 'friend';
  experiment_price?: string | number;
  question_number?: number;
  question_id?: string;
  result_pattern?: string;
  referral_source?: string;
  campaign?: string;
  [key: string]: any;
}

// In-memory set to deduplicate events in the same session
const firedEvents = new Set<string>();

/**
 * Privacy-safe analytics tracking function.
 * Explicitly sanitizes and prevents logging raw answers, access tokens, or sensitive scripts.
 */
export function trackEvent(event: FunnelEvent, properties: EventProperties = {}, dedupeKey?: string) {
  if (typeof window === 'undefined' || ['localhost', '127.0.0.1'].includes(window.location.hostname)) return;

  if (dedupeKey) {
    if (firedEvents.has(dedupeKey)) return;
    firedEvents.add(dedupeKey);
  }

  // Sanitize properties to strictly prohibit raw answers or tokens
  const sanitized: Record<string, any> = {};
  const allowed = new Set(['mode','experiment_price','question_number','question_id','result_pattern','referral_source','campaign']);
  for (const [key, val] of Object.entries(properties)) {
    if (allowed.has(key) && (typeof val === 'string' || typeof val === 'number')) sanitized[key] = typeof val === 'string' ? val.slice(0, 100) : val;
  }

  // Attach referrer and UTM params if available
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get('ref') && !sanitized.referral_source) {
      sanitized.referral_source = params.get('ref');
    }
    if (params.get('utm_campaign') && !sanitized.campaign) {
      sanitized.campaign = params.get('utm_campaign');
    }
  } catch (e) {
    // ignore
  }

  try {
    if (posthog.__loaded) {
      posthog.capture(event, sanitized);
    }
  } catch (err) {
    console.debug('[Analytics] Failed to send to PostHog:', err);
  }

  if (process.env.NODE_ENV !== 'production') {
    console.log(`[Analytics Event] ${event}`, sanitized);
  }
}
