import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import dbConnect from '../../../../lib/mongodb';
import User from '../../../../models/User';
import { authOptions } from '../auth/[...nextauth]/route';
import { toPlainObject } from '../../../../lib/utils';

// Get current user profile
export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    await dbConnect();
    
    let user = await User.findById(session.user.id).select('-password');
    
    // Convert to plain object using our utility function
    user = toPlainObject(user);
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        school: user.school,
        age: user.age,
        parentName: user.parentName,
        parentPhone: user.parentPhone,
        parentEmail: user.parentEmail,
        dietaryRestrictions: user.dietaryRestrictions,
        role: user.role,
      }
    });
    
  } catch (error) {
    console.error('Profile fetch error:', error);
    
    return NextResponse.json({ 
      success: false, 
      message: 'Error fetching user profile' 
    }, { status: 500 });
  }
}

// Update user profile
export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    await dbConnect();
    
    const userId = session.user.id;
    const body = await req.json();
    
    // Remove fields that shouldn't be updated directly
    const { password, email, role, resetPasswordToken, resetPasswordExpire, ...updateData } = body;
    
    let user = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
    
    // Convert to plain object using our utility function
    user = toPlainObject(user);
    
    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        school: user.school,
        age: user.age,
        parentName: user.parentName,
        parentPhone: user.parentPhone,
        parentEmail: user.parentEmail,
        dietaryRestrictions: user.dietaryRestrictions,
      }
    });
    
  } catch (error) {
    console.error('Profile update error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json({ 
        success: false, 
        message: 'Validation failed', 
        errors 
      }, { status: 400 });
    }
    
    return NextResponse.json({ 
      success: false, 
      message: 'Error updating user profile' 
    }, { status: 500 });
  }
}
