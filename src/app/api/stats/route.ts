import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

export const dynamic = 'force-dynamic';

const BASE_OFFSET = parseInt(process.env.INITIAL_COUNTER_OFFSET || '666', 10);
const COUNTER_KEY = 'mixedsigns_quiz_completed_count';

// In-memory fallback for local development or when Redis env vars are not set
let localFallbackCount = 0;

function getRedisClient(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    return null;
  }

  return new Redis({
    url,
    token,
  });
}

export async function GET() {
  try {
    const redis = getRedisClient();

    if (!redis) {
      return NextResponse.json({
        count: BASE_OFFSET + localFallbackCount,
        isLive: false,
      });
    }

    const liveCount = (await redis.get<number>(COUNTER_KEY)) || 0;

    return NextResponse.json(
      {
        count: BASE_OFFSET + Number(liveCount),
        isLive: true,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=30',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching stats counter:', error);
    return NextResponse.json({
      count: BASE_OFFSET + localFallbackCount,
      isLive: false,
    });
  }
}

export async function POST() {
  try {
    const redis = getRedisClient();

    if (!redis) {
      localFallbackCount += 1;
      return NextResponse.json({
        success: true,
        count: BASE_OFFSET + localFallbackCount,
        isLive: false,
      });
    }

    const newLiveCount = await redis.incr(COUNTER_KEY);

    return NextResponse.json({
      success: true,
      count: BASE_OFFSET + Number(newLiveCount),
      isLive: true,
    });
  } catch (error) {
    console.error('Error incrementing stats counter:', error);
    localFallbackCount += 1;
    return NextResponse.json({
      success: true,
      count: BASE_OFFSET + localFallbackCount,
      isLive: false,
    });
  }
}
