import { NextRequest, NextResponse } from 'next/server';
import { ApiKey } from '@/models/api-key.model';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  try {
    const { apiKey } = await req.json();

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is required' },
        { status: 400 }
      );
    }

    // Check rate limit
    const limiter = await rateLimit(req);
    if (!limiter.success) {
      return NextResponse.json(
        { error: limiter.message },
        { status: 429 }
      );
    }

    // Find and validate API key
    const key = await ApiKey.findOne({ key: apiKey, isActive: true });
    if (!key) {
      return NextResponse.json(
        { error: 'Invalid or inactive API key' },
        { status: 401 }
      );
    }

    // Update last used timestamp
    key.lastUsed = new Date();
    await key.save();

    return NextResponse.json({
      valid: true,
      name: key.name,
      createdAt: key.createdAt,
      lastUsed: key.lastUsed,
      remaining: limiter.remaining,
      reset: limiter.reset
    });
  } catch (error) {
    console.error('API key validation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
