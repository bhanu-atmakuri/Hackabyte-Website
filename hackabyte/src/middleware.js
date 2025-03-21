import { NextResponse } from 'next/server';

// This middleware function runs on every request
export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Define paths that don't require authentication
  const publicPaths = ['/', '/auth', '/about', '/contact', '/events', '/join-us', '/luma'];
  
  // Check if the path starts with /admin
  if (pathname.startsWith('/admin')) {
    // Check for authentication here
    // For now, we'll just let all admin requests pass through
    // In a real app, you would verify a session/token
    return NextResponse.next();
  }
  
  // For all other paths, allow access
  return NextResponse.next();
}

// Configure which paths this middleware should run on
export const config = {
  matcher: [
    // Apply to all paths except static files, api routes, and _next
    '/((?!_next/static|_next/image|favicon.ico|api).*)',
  ],
};
