import { NextResponse } from 'next/server';

// This middleware function runs on every request
export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Define paths that don't require authentication
  const publicPaths = ['/', '/auth', '/about', '/contact', '/events', '/join-us'];
  
  // Check if the path starts with /admin
  if (pathname.startsWith('/admin')) {
    // Check for authentication here
    // For now, let's set up a simple cookie check (replace with your actual auth logic)
    const authToken = request.cookies.get('auth_token')?.value;
    
    // If no auth token and not on the login page, redirect to auth page
    if (!authToken) {
      // In a real app, you would redirect to a login page
      // For now, we'll just continue to allow development
      console.log('Admin area accessed without authentication');
    }
    
    return NextResponse.next();
  }
  
  // For all other paths, allow access
  return NextResponse.next();
}

// Configure which paths this middleware should run on
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
