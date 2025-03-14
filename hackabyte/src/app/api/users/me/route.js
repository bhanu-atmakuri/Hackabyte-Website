/**
 * User Profile API Route
 * 
 * Handles fetching current user information:
 * - Validates authentication
 * - Retrieves user data from database
 * - Returns user profile without sensitive data
 */

import { NextResponse } from 'next/server';
import { getServerSession } from '../../../../lib/auth/server';
import connectDB from '../../../../lib/db/mongoose';
import User from '../../../../lib/models/User';

/**
 * GET handler for fetching current user profile
 * @param {Request} request - Next.js request object
 * @returns {Promise<NextResponse>} - JSON response with user data
 */
export async function GET(request) {
  try {
    // Check authentication
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Connect to database
    await connectDB();
    
    // Find user from session
    const user = await User.findById(session.user.id);
    
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }
    
    // Return user data without sensitive fields
    return NextResponse.json({
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      school: user.school,
      age: user.age,
      parentName: user.parentName,
      parentPhone: user.parentPhone,
      parentEmail: user.parentEmail,
      isVerified: user.isVerified,
      role: user.role,
      createdAt: user.createdAt,
    }, { status: 200 });
    
  } catch (error) {
    console.error('Error fetching user profile:', error);
    
    return NextResponse.json(
      { message: 'Failed to fetch user profile', error: error.message },
      { status: 500 }
    );
  }
}
