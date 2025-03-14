/**
 * Reset Password API Route
 * 
 * Handles password reset:
 * - Validates reset token
 * - Updates user password
 * - Returns appropriate response
 */

export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/db/mongoose';
import User from '../../../../lib/models/User';

/**
 * POST handler for password reset
 * @param {Request} request - Next.js request object
 * @returns {Promise<NextResponse>} - JSON response
 */
export async function POST(request) {
  try {
    const { token, password } = await request.json();
    
    if (!token || !password) {
      return NextResponse.json(
        { message: 'Token and password are required' },
        { status: 400 }
      );
    }
    
    // Validate password length
    if (password.length < 8) {
      return NextResponse.json(
        { message: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }
    
    // Connect to database
    await connectDB();
    
    // Find user by reset token and check if it's still valid
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    
    if (!user) {
      return NextResponse.json(
        { message: 'Password reset token is invalid or has expired' },
        { status: 400 }
      );
    }
    
    // Update user's password and clear reset token fields
    user.password = password; // Will be hashed by pre-save hook in model
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    
    return NextResponse.json(
      { message: 'Password has been reset successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Password reset error:', error);
    
    return NextResponse.json(
      { message: 'Failed to reset password', error: error.message },
      { status: 500 }
    );
  }
}
