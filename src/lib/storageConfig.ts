export class StorageConfigurationError extends Error {
    readonly code = 'STORAGE_NOT_CONFIGURED';
    constructor() {
        super('Shared report storage is not configured.');
        this.name = 'StorageConfigurationError';
    }
}

// Vercel Marketplace may provision the KV_* names; never use its read-only token.
export function redisCredentials(env: NodeJS.ProcessEnv = process.env) {
    if (env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN)
        return { url: env.UPSTASH_REDIS_REST_URL, token: env.UPSTASH_REDIS_REST_TOKEN };
    if (env.KV_REST_API_URL && env.KV_REST_API_TOKEN)
        return { url: env.KV_REST_API_URL, token: env.KV_REST_API_TOKEN };
    return null;
}

export function assertStorageConfigured() {
    if (process.env.NODE_ENV === 'production' &&
        (!redisCredentials() || !/^[a-f0-9]{64}$/i.test(process.env.DATA_ENCRYPTION_KEY || '')))
        throw new StorageConfigurationError();
}
