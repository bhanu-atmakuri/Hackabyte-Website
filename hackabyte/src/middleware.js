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

// Routes that should be excluded from middleware processing
const EXCLUDED_ROUTES = [
  '/api/',
  '/_next/',
  '/static/',
  '/public/',
  '/favicon.ico',
  '/404.html',
  '/index.html'
];

// File extensions to exclude from middleware processing
const EXCLUDED_EXTENSIONS = [
  '.json',
  '.js',
  '.css',
  '.svg',
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.ico',
  '.woff',
  '.woff2',
  '.ttf',
  '.otf',
  '.html'
];

/**
 * Middleware function to check authentication status and control access to routes
 * 
 * @param {Request} request - The request object
 * @returns {NextResponse} - The response or a redirect
 */
export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Skip processing for root path to ensure homepage works
  if (pathname === '/' || pathname === '') {
    return NextResponse.next();
  }
  
  // Skip middleware for excluded routes and static assets
  if (EXCLUDED_ROUTES.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Skip middleware for files with excluded extensions
  if (EXCLUDED_EXTENSIONS.some(ext => pathname.endsWith(ext))) {
    return NextResponse.next();
  }

  // Get auth token from cookies
  const authToken = request.cookies.get('hackabyte_auth_token')?.value;
  
  // Check if the path is protected
  const isProtectedRoute = PROTECTED_ROUTES.some(route => 
    pathname.startsWith(route)
  );
  
  // Check if the path is an auth route
  const isAuthRoute = AUTH_ROUTES.some(route => 
    pathname.startsWith(route)
  );

  try {
    // Verify the token if it exists
    const isLoggedIn = authToken ? 
      !!verify(authToken, process.env.NEXTAUTH_SECRET || 'development_secret') : 
      false;

    // Redirect to login if trying to access protected route without auth
    if (isProtectedRoute && !isLoggedIn) {
      const loginUrl = new URL('/auth', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Redirect to dashboard if logged in and trying to access auth routes
    if (isAuthRoute && isLoggedIn) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Admin route protection - additional role check
    if (pathname.startsWith('/admin')) {
      try {
        const decoded = verify(authToken, process.env.NEXTAUTH_SECRET || 'development_secret');
        if (decoded.role !== 'admin') {
          return NextResponse.redirect(new URL('/', request.url));
        }
      } catch (error) {
        // Invalid token for admin route
        return NextResponse.redirect(new URL('/auth', request.url));
      }
    }
  } catch (error) {
    // Log the error for debugging but don't crash
    console.error('Middleware auth error:', error);
    
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

  // Allow the request to proceed
  return NextResponse.next();
}

// Configure matcher for which routes should be processed by middleware
export const config = {
  matcher: [
    // Process all routes except for static assets and API routes
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
