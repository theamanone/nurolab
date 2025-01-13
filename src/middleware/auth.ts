import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/jwt';
import { rateLimit } from '@/lib/rate-limit';

export async function middleware(request: NextRequest) {
  // Check if it's an API route
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // Rate limiting
    try {
      const forwardedFor = request.headers.get('x-forwarded-for');
      const ip = forwardedFor ? forwardedFor.split(',')[0] : 'anonymous';
      const { success, limit, remaining, reset } = await rateLimit(ip);
      
      if (!success) {
        return new NextResponse(JSON.stringify({
          error: 'Too many requests',
          limit,
          remaining,
          reset
        }), {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': reset.toString(),
          },
        });
      }
    } catch (error) {
      console.error('Rate limiting error:', error);
    }

    // CORS check
    const origin = request.headers.get('origin');
    if (origin && !isAllowedOrigin(origin)) {
      return new NextResponse(null, {
        status: 403,
        statusText: 'Forbidden',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Authentication check for protected routes
    if (isProtectedRoute(request.nextUrl.pathname)) {
      const token = request.headers.get('authorization')?.split(' ')[1];
      
      if (!token) {
        return new NextResponse(JSON.stringify({ error: 'Authentication required' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      try {
        const decoded = await verifyToken(token);
        // Add user info to request headers for route handlers
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set('x-user-id', decoded.userId);
        requestHeaders.set('x-user-role', decoded.role);

        return NextResponse.next({
          request: {
            headers: requestHeaders,
          },
        });
      } catch (error) {
        return new NextResponse(JSON.stringify({ error: 'Invalid token' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }
  }

  return NextResponse.next();
}

// Configure which routes should be protected
function isProtectedRoute(pathname: string): boolean {
  const protectedPaths = [
    '/api/courses/create',
    '/api/courses/edit',
    '/api/user/profile',
    '/api/admin',
  ];
  return protectedPaths.some(path => pathname.startsWith(path));
}

// Configure allowed origins
function isAllowedOrigin(origin: string): boolean {
  const allowedOrigins = [
    'https://nurolab.com',
    'https://api.nurolab.com',
    'http://localhost:3000',
  ];
  return allowedOrigins.includes(origin);
}

export const config = {
  matcher: '/api/:path*',
};
