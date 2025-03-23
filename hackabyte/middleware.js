import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  // Check if the path starts with /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Get the admin authentication cookie
    const adminToken = request.cookies.get('admin_token');
    
    // If no admin token is present, redirect to home page
    if (!adminToken) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    
    // Optionally validate the token here if needed
    // For a more secure implementation, you could verify the token's validity
  }
  
  // Continue with the request for non-admin routes or authenticated admin users
  return NextResponse.next();
}

// Only run middleware on admin routes
export const config = {
  matcher: '/admin/:path*',
};
