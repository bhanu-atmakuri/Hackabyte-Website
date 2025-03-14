/**
 * Forgot Password API Route
 * 
 * Handles password reset request process:
 * - Verifies email exists in system
 * - Generates reset token
 * - Sends password reset email
 * - Returns appropriate response
 */

import { NextResponse } from 'next/server';
import crypto from 'crypto';
import connectDB from '../../../../lib/db/mongoose';
import User from '../../../../lib/models/User';
import { sendPasswordResetEmail } from '../../../../lib/email/emailService';

/**
 * POST handler for password reset request
 * @param {Request} request - Next.js request object
 * @returns {Promise<NextResponse>} - JSON response
 */
export async function POST(request) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      );
    }
    
    // Connect to database
    await connectDB();
    
    // Find user by email
    const user = await User.findOne({ email });
    
    // If no user found, still return success for security
    // This prevents enumeration of valid email addresses
    if (!user) {
      return NextResponse.json(
        { message: 'If your email is registered, you will receive a password reset link' },
        { status: 200 }
      );
    }
    
    // Generate reset token and expiry
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetExpires = Date.now() + 3600000; // 1 hour
    
    // Update user with reset token and expiry
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetExpires;
    await user.save();
    
    // Send password reset email
    await sendPasswordResetEmail(email, user.fullName, resetToken);
    
    return NextResponse.json(
      { message: 'If your email is registered, you will receive a password reset link' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Password reset error:', error);
    
    return NextResponse.json(
      { message: 'Failed to process password reset request', error: error.message },
      { status: 500 }
    );
  }
}
