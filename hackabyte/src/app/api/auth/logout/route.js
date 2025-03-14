/**
 * Logout API Route
 * 
 * Handles user logout by clearing authentication cookies
 */

import { NextResponse } from 'next/server';

/**
 * POST handler for user logout
 * 
 * @returns {Response} - JSON response confirming logout
 */
export async function POST() {
  try {
    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully',
    });

    // Clear the authentication cookie
    response.cookies.set('hackabyte_auth_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(0),
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
