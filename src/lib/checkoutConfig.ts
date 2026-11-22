export function stripeCheckoutConfig() {
    const key = process.env.STRIPE_SECRET_KEY?.trim();
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
    const isTestKey = /^(?:sk|rk)_test_/.test(key ?? '');
    const isLiveKey = /^(?:sk|rk)_live_/.test(key ?? '');

    if (process.env.NODE_ENV === 'development') {
        return isTestKey && key
            ? { key, testMode: true }
            : null;
    }
    if (!key || !webhookSecret) return null;
    if (process.env.VERCEL_ENV === 'production' && !isLiveKey) return null;
    if (process.env.VERCEL_ENV === 'preview' && !isTestKey) return null;
    return isTestKey || isLiveKey ? { key, testMode: isTestKey } : null;
}

export function checkoutAvailability() {
    const config = stripeCheckoutConfig();
    return {
        checkoutAvailable: config !== null,
        checkoutTestMode: config?.testMode ?? false,
        checkoutUnavailableReason: config ? undefined : process.env.NODE_ENV === 'development'
            ? 'Stripe test mode is not configured. Your answers are saved.'
            : 'Payment is temporarily unavailable. Your answers are saved.',
    };
}
