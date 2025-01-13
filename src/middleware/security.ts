import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL || '',
  token: process.env.UPSTASH_REDIS_TOKEN || '',
});

// Security constants
const RATE_LIMIT_WINDOW = 60; // 1 minute
const MAX_REQUESTS = 100; // Maximum requests per minute
const BLOCK_DURATION = 60 * 60; // 1 hour in seconds
const MAX_FAILED_ATTEMPTS = 5;

interface SecurityLog {
  timestamp: number;
  action: string;
  ip: string;
  userId?: string;
  path: string;
  method: string;
  statusCode: number;
}

function getClientIP(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  
  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  return 'unknown';
}

export async function securityMiddleware(request: NextRequest) {
  const ip = getClientIP(request);
  const path = request.nextUrl.pathname;

  // Check if IP is blocked
  const isBlocked = await redis.get(`blocked:${ip}`);
  if (isBlocked) {
    return new NextResponse('Too Many Requests', { status: 429 });
  }

  // Rate limiting
  const requestCount = await redis.incr(`requests:${ip}`);
  if (requestCount === 1) {
    await redis.expire(`requests:${ip}`, RATE_LIMIT_WINDOW);
  }

  if (requestCount > MAX_REQUESTS) {
    await redis.set(`blocked:${ip}`, 'true', { ex: BLOCK_DURATION });
    return new NextResponse('Too Many Requests', { status: 429 });
  }

  // Check for suspicious patterns
  if (isSuspiciousRequest(request)) {
    const failedAttempts = await redis.incr(`failed:${ip}`);
    if (failedAttempts >= MAX_FAILED_ATTEMPTS) {
      await redis.set(`blocked:${ip}`, 'true', { ex: BLOCK_DURATION });
      return new NextResponse('Suspicious Activity Detected', { status: 403 });
    }
    await redis.expire(`failed:${ip}`, BLOCK_DURATION);
  }

  // Log security event
  const token = await getToken({ req: request });
  const log: SecurityLog = {
    timestamp: Date.now(),
    action: 'request',
    ip,
    userId: token?.sub,
    path,
    method: request.method,
    statusCode: 200,
  };
  await logSecurityEvent(log);

  return NextResponse.next();
}

function isSuspiciousRequest(request: NextRequest): boolean {
  const suspiciousPatterns = [
    /\.\./,  // Directory traversal
    /<script/i,  // XSS attempts
    /union\s+select/i,  // SQL injection
    /exec\(/i,  // Command injection
  ];

  const url = request.nextUrl.toString();
  const body = request.body?.toString() || '';

  return suspiciousPatterns.some(pattern => 
    pattern.test(url) || pattern.test(body)
  );
}

async function logSecurityEvent(log: SecurityLog) {
  await redis.lpush('security_logs', JSON.stringify(log));
  await redis.ltrim('security_logs', 0, 9999); // Keep last 10000 logs
}
