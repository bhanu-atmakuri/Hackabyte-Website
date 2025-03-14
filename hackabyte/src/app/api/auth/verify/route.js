/**
 * Email Verification API Route
 * 
 * Handles email verification process:
 * - Validates verification token
 * - Updates user verification status
 * - Returns appropriate response
 */

import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/db/mongoose';
import User from '../../../../lib/models/User';

/**
 * POST handler for email verification
 * @param {Request} request - Next.js request object
 * @returns {Promise<NextResponse>} - JSON response
 */
export async function POST(request) {
  try {
    const { token } = await request.json();
    
    if (!token) {
      return NextResponse.json(
        { message: 'Verification token is required' },
        { status: 400 }
      );
    }
    
    // Connect to database
    await connectDB();
    
    // Find user by verification token
    const user = await User.findOne({ verificationToken: token });
    
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid verification token' },
        { status: 404 }
      );
    }
    
    // Update user verification status
    user.isVerified = true;
    user.verificationToken = undefined; // Remove token after verification
    await user.save();
    
    return NextResponse.json(
      { message: 'Email verified successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Verification error:', error);
    
    return NextResponse.json(
      { message: 'Failed to verify email', error: error.message },
      { status: 500 }
    );
  }
}

/**
 * GET handler for email verification (via link click)
 * @param {Request} request - Next.js request object
 * @returns {Promise<NextResponse>} - Redirect response
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    
    if (!token) {
      return NextResponse.redirect(new URL('/auth?error=missing_token', request.url));
    }
    
    // Connect to database
    await connectDB();
    
    // Find user by verification token
    const user = await User.findOne({ verificationToken: token });
    
    if (!user) {
      return NextResponse.redirect(new URL('/auth?error=invalid_token', request.url));
    }
    
    // Update user verification status
    user.isVerified = true;
    user.verificationToken = undefined; // Remove token after verification
    await user.save();
    
    return NextResponse.redirect(new URL('/auth?verified=true', request.url));
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.redirect(new URL('/auth?error=server_error', request.url));
  }
}
