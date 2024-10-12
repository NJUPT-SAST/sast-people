import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/session';
import { cookies } from 'next/headers';

// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard'];
const publicRoutes = ['/login', '/signup', '/'];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const cookie = cookies().get('session')?.value;
  const session = await decrypt(cookie);

  // 4. Get more information about the request
  const ip = req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for');
  const userAgent = req.headers.get('user-agent');
  const method = req.method;

  console.log(`Request from ${session?.uid} (${session?.name})`, { path, isProtectedRoute, isPublicRoute, ip, userAgent, method });

  // 5. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session?.uid) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  if (path === '/login' && session?.uid) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  // 6. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    session?.uis &&
    !req.nextUrl.pathname.startsWith('/dashboard')
  ) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
