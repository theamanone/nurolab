import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  if (token) {
    // Redirect based on user role
    if (token.role === 'admin') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
    if (token.role === 'student') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    // Default redirect for other roles
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login'],
};
