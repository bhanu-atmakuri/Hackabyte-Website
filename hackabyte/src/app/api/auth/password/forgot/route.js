import { NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '../../../../../../lib/mongodb';
import User from '../../../../../../models/User';
import { sendPasswordResetEmail } from '../../../../../../lib/email';

export async function POST(req) {
  try {
    await dbConnect();
    
    const { email } = await req.json();
    
    // Find user by email
    const user = await User.findOne({ email });
    
    // Don't reveal whether a user was found to avoid potential security risks
    if (!user) {
      return NextResponse.json({ 
        success: true, 
        message: 'If an account with that email exists, a password reset link has been sent' 
      });
    }
    
    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    
    // Hash token and set to resetPasswordToken field
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    
    // Set token expiry (1 hour)
    const resetPasswordExpire = Date.now() + 60 * 60 * 1000;
    
    // Save token to user
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpire = resetPasswordExpire;
    await user.save();
    
    // Create reset URL
    const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}`;
    
    // Send password reset email
    await sendPasswordResetEmail(user, resetUrl);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Password reset link sent to email' 
    });
    
  } catch (error) {
    console.error('Password reset request error:', error);
    
    return NextResponse.json({ 
      success: false, 
      message: 'Error sending password reset email' 
    }, { status: 500 });
  }
}
