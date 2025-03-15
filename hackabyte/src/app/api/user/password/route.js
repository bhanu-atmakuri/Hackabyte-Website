import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { hash, compare } from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

/**
 * PUT /api/user/password - Update the current user's password
 * 
 * Request body:
 * - currentPassword: The user's current password for verification
 * - newPassword: The new password to set
 * 
 * Returns:
 * - success: boolean indicating if the password was updated successfully
 * - message: description of the result
 */
export async function PUT(request) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ 
        success: false, 
        message: 'Authentication required' 
      }, { status: 401 });
    }
    
    // Get the user ID from the session
    const userId = session.user.id;
    
    // Parse the request body
    const { currentPassword, newPassword } = await request.json();
    
    // Validate inputs
    if (!currentPassword || !newPassword) {
      return NextResponse.json({ 
        success: false, 
        message: 'Both current password and new password are required' 
      }, { status: 400 });
    }
    
    // Password requirements validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      return NextResponse.json({ 
        success: false, 
        message: 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character' 
      }, { status: 400 });
    }
    
    // Connect to the database
    await dbConnect();
    
    // Find the user
    const user = await User.findById(userId);
    
    if (!user) {
      return NextResponse.json({ 
        success: false, 
        message: 'User not found' 
      }, { status: 404 });
    }
    
    // Verify the current password
    const isValidPassword = await compare(currentPassword, user.password);
    
    if (!isValidPassword) {
      return NextResponse.json({ 
        success: false, 
        message: 'Current password is incorrect' 
      }, { status: 400 });
    }
    
    // Hash the new password
    const hashedPassword = await hash(newPassword, 10);
    
    // Update the user's password
    user.password = hashedPassword;
    await user.save();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Password updated successfully' 
    });
    
  } catch (error) {
    console.error('Error updating password:', error);
    
    return NextResponse.json({ 
      success: false, 
      message: 'An error occurred while updating the password' 
    }, { status: 500 });
  }
}
