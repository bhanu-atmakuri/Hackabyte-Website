/**
 * Legacy NextAuth.js Compatible API Route
 * 
 * This route provides backward compatibility with NextAuth.js API requests
 * but uses our custom JWT implementation instead.
 */

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getServerSession } from '../../../../lib/auth/server';

/**
 * GET handler - Returns the current session (similar to NextAuth)
 */
export async function GET(request) {
  // Check if the request is for session data
  if (request.url.includes('/api/auth/session')) {
    const session = await getServerSession();
    
    // Return session data in NextAuth format for compatibility
    return NextResponse.json(session || { user: null });
  }
  
  // For other types of GET requests, return not implemented
  return NextResponse.json({ error: 'Not implemented' }, { status: 501 });
}

/**
 * POST handler - Placeholder for compatibility but redirects to our custom endpoints
 */
export async function POST(request) {
  // Get the next-auth specific action from the URL
  const { pathname } = new URL(request.url);
  const action = pathname.split('/').pop();
  
  // For signin action, redirect to our login endpoint
  if (action === 'signin' || action === 'callback') {
    const redirectUrl = '/api/auth/login';
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }
  
  // For signout action, redirect to our logout endpoint
  if (action === 'signout') {
    const redirectUrl = '/api/auth/logout';
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }
  
  // For other actions, return not implemented
  return NextResponse.json({ error: 'Not implemented' }, { status: 501 });
}
