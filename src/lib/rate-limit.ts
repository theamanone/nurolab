import { Redis } from '@upstash/redis';
import { NextRequest } from 'next/server';
import { ApiKey } from '@/models/api-key.model';

const redis = new Redis({
  url: process.env.REDIS_URL || '',
  token: process.env.REDIS_TOKEN || '',
});

interface RateLimitResult {
  success: boolean;
  remaining?: number;
  reset?: string;
  message?: string;
}

export async function rateLimit(req: NextRequest): Promise<RateLimitResult> {
  try {
    const apiKey = req.headers.get('x-api-key');
    if (!apiKey) {
      return {
        success: false,
        remaining: 0,
        reset: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        message: 'API key required'
      };
    }

    const key = await ApiKey.findOne({ key: apiKey, isActive: true });
    if (!key) {
      return {
        success: false,
        remaining: 0,
        reset: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        message: 'Invalid or inactive API key'
      };
    }

    const identifier = `rate_limit:${apiKey}`;
    const now = Date.now();
    const windowSize = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    const limit = 100; // requests per day for free tier

    // Get all requests in the current window
    const requests = await redis.zrange(identifier, now - windowSize, now);
    const requestCount = requests.length;

    if (requestCount >= limit) {
      return {
        success: false,
        remaining: 0,
        reset: new Date(now + windowSize).toISOString(),
        message: 'Rate limit exceeded'
      };
    }

    // Add current request with score as timestamp
    await redis.zadd(identifier, { score: now, member: now.toString() });
    await redis.expire(identifier, Math.floor(windowSize / 1000));

    // Update last used timestamp
    key.lastUsed = new Date();
    await key.save();

    return {
      success: true,
      remaining: limit - requestCount - 1,
      reset: new Date(now + windowSize).toISOString()
    };
  } catch (error) {
    console.error('Rate limit error:', error);
    return {
      success: false,
      remaining: 0,
      reset: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      message: 'Internal server error'
    };
  }
}
