import { NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '../../../../../../lib/mongodb';
import User from '../../../../../../models/User';

export async function POST(req) {
  try {
    await dbConnect();
    
    const { token, password } = await req.json();
    
    // Hash token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');
    
    // Find user with the token and check if token is still valid
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired token' },
        { status: 400 }
      );
    }
    
    // Set new password
    user.password = password;
    
    // Clear reset token fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    
    await user.save();
    
    return NextResponse.json({
      success: true,
      message: 'Password has been reset'
    });
    
  } catch (error) {
    console.error('Password reset error:', error);
    
    return NextResponse.json({ 
      success: false, 
      message: 'Error resetting password' 
    }, { status: 500 });
  }
}
