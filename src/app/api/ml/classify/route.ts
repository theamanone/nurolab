import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Rate limiting
    const limiter = await rateLimit(req);
    if (!limiter.success) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { text, model } = body;

    if (!text || !model) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Mock sentiment analysis
    const sentiments = ['positive', 'negative', 'neutral'];
    const mockResult = {
      label: sentiments[Math.floor(Math.random() * sentiments.length)],
      confidence: Math.random().toFixed(2)
    };

    return NextResponse.json(mockResult);
  } catch (error) {
    console.error('Classification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
