import { NextResponse } from 'next/server';

/**
 * Middleware to protect admin routes
 * Checks for admin token cookie before allowing access to admin pages
 */
export async function middleware(request) {
  // Only apply this middleware to admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Get auth token from cookies
    const authToken = request.cookies.get('admin_token')?.value;
    
    if (!authToken) {
      // No auth token found, redirect to login
      return redirectToLogin(request);
    }
    
    try {
      // Verify token using our API route
      const verifyResponse = await fetch(new URL('/api/auth/verify', request.url), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: authToken }),
      });
      
      const { valid, admin } = await verifyResponse.json();
      
      // Check if user has admin role
      if (!valid || !admin) {
        return redirectToLogin(request);
      }
      
      // User is authenticated as admin, continue
      return NextResponse.next();
    } catch (error) {
      console.error('Error verifying auth token:', error);
      return redirectToLogin(request);
    }
  }
  
  // Continue for non-admin routes
  return NextResponse.next();
}

function redirectToLogin(request) {
  const url = new URL('/auth', request.url);
  // Add a parameter to indicate where to redirect after login
  url.searchParams.set('from', request.nextUrl.pathname);
  return NextResponse.redirect(url);
}

// Configure the paths this middleware runs for
export const config = {
  matcher: ['/admin/:path*'],
};
