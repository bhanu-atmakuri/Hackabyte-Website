/**
 * Authentication Middleware
 * 
 * Handles authentication checking and redirection for protected routes
 * Custom implementation replacing NextAuth.js for Next.js 15 compatibility
 */

import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

// Routes that require authentication
const PROTECTED_ROUTES = [
  '/dashboard',
  '/admin',
  '/events/register',
];

// Routes that should redirect logged in users
const AUTH_ROUTES = [
  '/auth',
];

/**
 * Middleware function to check authentication status and control access to routes
 * 
 * @param {Request} request - The request object
 * @returns {NextResponse} - The response or a redirect
 */
export function middleware(request) {
  // Get auth token from cookies
  const authToken = request.cookies.get('hackabyte_auth_token')?.value;
  
  // Check if the path is protected
  const isProtectedRoute = PROTECTED_ROUTES.some(route => 
    request.nextUrl.pathname.startsWith(route)
  );
  
  // Check if the path is an auth route
  const isAuthRoute = AUTH_ROUTES.some(route => 
    request.nextUrl.pathname.startsWith(route)
  );

  try {
    // Verify the token if it exists
    const isLoggedIn = authToken ? 
      !!verify(authToken, process.env.NEXTAUTH_SECRET) : 
      false;

    // Redirect to login if trying to access protected route without auth
    if (isProtectedRoute && !isLoggedIn) {
      const loginUrl = new URL('/auth', request.url);
      loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Redirect to dashboard if logged in and trying to access auth routes
    if (isAuthRoute && isLoggedIn) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Admin route protection - additional role check
    if (request.nextUrl.pathname.startsWith('/admin')) {
      try {
        const decoded = verify(authToken, process.env.NEXTAUTH_SECRET);
        if (decoded.role !== 'admin') {
          return NextResponse.redirect(new URL('/', request.url));
        }
      } catch (error) {
        return NextResponse.redirect(new URL('/auth', request.url));
      }
    }
  } catch (error) {
    // Invalid token, clear it and redirect to login if protected route
    if (isProtectedRoute) {
      const response = NextResponse.redirect(new URL('/auth', request.url));
      response.cookies.set('hackabyte_auth_token', '', {
        httpOnly: true,
        expires: new Date(0),
        path: '/',
      });
      return response;
    }
  }

  return NextResponse.next();
}

// Configure matcher for which routes should be processed by middleware
export const config = {
  matcher: [
    '/dashboard/:path*', 
    '/admin/:path*', 
    '/auth', 
    '/events/register/:path*',
  ],
};
