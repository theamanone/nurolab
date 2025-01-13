import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = process.env.UPSTASH_REDIS_URL && process.env.UPSTASH_REDIS_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_URL,
      token: process.env.UPSTASH_REDIS_TOKEN,
    })
  : null;

// Security constants
const RATE_LIMIT_WINDOW = 60; // 1 minute
const MAX_REQUESTS = 100; // Maximum requests per minute
const BLOCK_DURATION = 60 * 60; // 1 hour in seconds
const MAX_FAILED_ATTEMPTS = 5;

// Role-based route configuration
const routeConfig = {
  admin: ['/admin', '/admin/dashboard', '/admin/users', '/admin/courses'],
  student: ['/dashboard', '/courses', '/my-courses', '/profile'],
  public: ['/', '/about', '/contact', '/auth/signin', '/auth/signup', '/cookies'],
};

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

async function securityCheck(request: NextRequest) {
  // Skip security checks if Redis is not configured
  if (!redis) {
    console.warn('Redis not configured - security checks disabled');
    return null;
  }

  const ip = getClientIP(request);
  
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

  return null;
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

export default withAuth(
  async function middleware(req) {
    const path = req.nextUrl.pathname;

    // Allow public routes without security checks
    if (routeConfig.public.some(route => path.startsWith(route))) {
      return NextResponse.next();
    }

    // Security check for protected routes
    const securityResult = await securityCheck(req);
    if (securityResult) return securityResult;

    const token = req.nextauth.token;

    // Check if user is authenticated
    if (!token) {
      return NextResponse.redirect(new URL('/auth/signin', req.url));
    }

    // Role-based access control
    const userRole = token.role as keyof typeof routeConfig;
    
    // Admin has access to everything
    if (userRole === 'admin') {
      return NextResponse.next();
    }

    // Check if user has access to the requested route
    const allowedRoutes = routeConfig[userRole] || [];
    if (!allowedRoutes.some(route => path.startsWith(route))) {
      // Log unauthorized access attempt if Redis is configured
      if (redis) {
        const ip = getClientIP(req);
        await redis.incr(`unauthorized:${ip}`);
      }
      
      // Redirect to appropriate dashboard based on role
      const dashboardPath = '/dashboard';
      return NextResponse.redirect(new URL(dashboardPath, req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// Protect these paths
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/courses/:path*',
    '/profile/:path*',
    // '/api/:path*',
  ],
};
