function productionSandboxEnabled() {
    return process.env.VERCEL_ENV === 'production' && process.env.STRIPE_ALLOW_TEST_CHECKOUT === 'true';
}

export function stripeCheckoutConfig() {
    const key = process.env.STRIPE_SECRET_KEY?.trim();
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
    const isTestKey = /^(?:sk|rk)_test_/.test(key ?? '');
    const isLiveKey = /^(?:sk|rk)_live_/.test(key ?? '');

    if (process.env.NODE_ENV === 'development' || productionSandboxEnabled()) {
        return isTestKey && key
            ? { key, testMode: true }
            : null;
    }
    if (!key || !webhookSecret) return null;
    if (process.env.VERCEL_ENV === 'production' && !isLiveKey) return null;
    if (process.env.VERCEL_ENV === 'preview' && !isTestKey) return null;
    return isTestKey || isLiveKey ? { key, testMode: isTestKey } : null;
}

export function stripeWebhookSecrets() {
    const secret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
    if (process.env.VERCEL_ENV === 'production') {
        return {
            live: secret,
            test: productionSandboxEnabled() ? process.env.STRIPE_TEST_WEBHOOK_SECRET?.trim() : undefined,
        };
    }
    const key = process.env.STRIPE_SECRET_KEY?.trim() ?? '';
    return {
        live: /^(?:sk|rk)_live_/.test(key) ? secret : undefined,
        test: /^(?:sk|rk)_test_/.test(key) ? secret : undefined,
    };
}

export function checkoutMatchesStripeMode(sessionId: string, testMode: boolean) {
    return sessionId.startsWith(testMode ? 'cs_test_' : 'cs_live_');
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
