import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

export const dynamic = 'force-dynamic';

const BASE_OFFSET = parseInt(process.env.INITIAL_COUNTER_OFFSET || '666', 10);
const COUNTER_KEY = 'mixedsigns_quiz_completed_count';

// In-memory fallback for local development or when Redis env vars are not set
let localFallbackCount = 0;

interface RedisResolution {
  redis: Redis | null;
  urlKey?: string;
  tokenKey?: string;
  error?: string;
}

function getRedisClient(): RedisResolution {
  let url =
    process.env.STORAGE_KV_REST_API_URL ||
    process.env.KV_REST_API_URL ||
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.VERCEL_KV_REST_API_URL;

  let urlKey = process.env.STORAGE_KV_REST_API_URL
    ? 'STORAGE_KV_REST_API_URL'
    : process.env.KV_REST_API_URL
    ? 'KV_REST_API_URL'
    : process.env.UPSTASH_REDIS_REST_URL
    ? 'UPSTASH_REDIS_REST_URL'
    : process.env.VERCEL_KV_REST_API_URL
    ? 'VERCEL_KV_REST_API_URL'
    : '';

  // Write token (Strictly avoid READ_ONLY token)
  let token =
    process.env.STORAGE_KV_REST_API_TOKEN ||
    process.env.KV_REST_API_TOKEN ||
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.VERCEL_KV_REST_API_TOKEN;

  let tokenKey = process.env.STORAGE_KV_REST_API_TOKEN
    ? 'STORAGE_KV_REST_API_TOKEN'
    : process.env.KV_REST_API_TOKEN
    ? 'KV_REST_API_TOKEN'
    : process.env.UPSTASH_REDIS_REST_TOKEN
    ? 'UPSTASH_REDIS_REST_TOKEN'
    : process.env.VERCEL_KV_REST_API_TOKEN
    ? 'VERCEL_KV_REST_API_TOKEN'
    : '';

  // Scan all process.env keys as fallback, strictly ignoring READ_ONLY keys
  if (!url || !token) {
    for (const [k, v] of Object.entries(process.env)) {
      if (!v) continue;
      // Skip read-only tokens
      if (k.toUpperCase().includes('READ_ONLY') || k.toUpperCase().includes('READONLY')) {
        continue;
      }
      if (!url && (k.endsWith('REST_API_URL') || k.endsWith('REST_URL'))) {
        url = v;
        urlKey = k;
      }
      if (!token && (k.endsWith('REST_API_TOKEN') || k.endsWith('REST_TOKEN'))) {
        token = v;
        tokenKey = k;
      }
    }
  }

  if (!url || !token) {
    return {
      redis: null,
      error: `Missing Redis credentials. Found URL: ${urlKey || 'none'}, Token: ${tokenKey || 'none'}`,
    };
  }

  try {
    const redis = new Redis({
      url,
      token,
    });
    return { redis, urlKey, tokenKey };
  } catch (err: any) {
    return { redis: null, error: err?.message || 'Redis client initialization failed' };
  }
}

export async function GET() {
  try {
    const { redis, urlKey, tokenKey, error: initError } = getRedisClient();

    if (!redis) {
      const detectedEnvKeys = Object.keys(process.env).filter(
        (k) =>
          k.includes('REDIS') ||
          k.includes('KV') ||
          k.includes('UPSTASH') ||
          k.includes('STORAGE')
      );

      return NextResponse.json(
        {
          count: BASE_OFFSET + localFallbackCount,
          isLive: false,
          warning: 'Redis not active. Falling back to temporary in-memory counter.',
          initError,
          detectedEnvKeys,
        },
        {
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate',
          },
        }
      );
    }

    const liveCount = (await redis.get<number>(COUNTER_KEY)) || 0;

    return NextResponse.json(
      {
        count: BASE_OFFSET + Number(liveCount),
        isLive: true,
        connectedVia: { urlKey, tokenKey },
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    );
  } catch (error: any) {
    console.error('Error fetching stats counter:', error);
    return NextResponse.json(
      {
        count: BASE_OFFSET + localFallbackCount,
        isLive: false,
        error: error?.message || 'Failed to query Redis',
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    );
  }
}

export async function POST() {
  try {
    const { redis, urlKey, tokenKey, error: initError } = getRedisClient();

    if (!redis) {
      localFallbackCount += 1;
      return NextResponse.json({
        success: true,
        count: BASE_OFFSET + localFallbackCount,
        isLive: false,
        warning: 'Redis not active. Incremented temporary in-memory counter.',
        initError,
      });
    }

    const newLiveCount = await redis.incr(COUNTER_KEY);

    return NextResponse.json({
      success: true,
      count: BASE_OFFSET + Number(newLiveCount),
      isLive: true,
      connectedVia: { urlKey, tokenKey },
    });
  } catch (error: any) {
    console.error('Error incrementing stats counter in Redis:', error);
    localFallbackCount += 1;
    return NextResponse.json({
      success: false,
      count: BASE_OFFSET + localFallbackCount,
      isLive: false,
      error: error?.message || 'Redis increment failed',
    });
  }
}
