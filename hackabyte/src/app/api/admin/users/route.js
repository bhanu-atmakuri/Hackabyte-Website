import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import dbConnect from '../../../../../lib/mongodb';
import User from '../../../../../models/User';
import { authOptions } from '../../auth/[...nextauth]/route';

// Get all users (admin only)
export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated and is an admin
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Not authorized' },
        { status: 403 }
      );
    }
    
    await dbConnect();
    
    // Allow searching by name or email
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    
    let query = {};
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ]
      };
    }
    
    const users = await User.find(query)
      .select('-password -resetPasswordToken -resetPasswordExpire')
      .sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      count: users.length,
      users
    });
    
  } catch (error) {
    console.error('Error fetching users:', error);
    
    return NextResponse.json({ 
      success: false, 
      message: 'Error fetching users' 
    }, { status: 500 });
  }
}

// Get a specific user (admin only)
export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated and is an admin
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Not authorized' },
        { status: 403 }
      );
    }
    
    await dbConnect();
    
    const body = await req.json();
    const { userId, ...updateData } = body;
    
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }
    
    // Remove fields that shouldn't be updated directly except by admin
    const { password, resetPasswordToken, resetPasswordExpire, ...allowedUpdates } = updateData;
    
    const user = await User.findByIdAndUpdate(
      userId,
      allowedUpdates,
      { new: true, runValidators: true }
    ).select('-password -resetPasswordToken -resetPasswordExpire');
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'User updated successfully',
      user
    });
    
  } catch (error) {
    console.error('Error updating user:', error);
    
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
      message: 'Error updating user' 
    }, { status: 500 });
  }
}

// Delete a user (admin only)
export async function DELETE(req) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated and is an admin
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Not authorized' },
        { status: 403 }
      );
    }
    
    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }
    
    // Prevent deleting yourself
    if (userId === session.user.id) {
      return NextResponse.json(
        { success: false, message: 'Cannot delete your own account' },
        { status: 400 }
      );
    }
    
    const user = await User.findByIdAndDelete(userId);
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'User deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting user:', error);
    
    return NextResponse.json({ 
      success: false, 
      message: 'Error deleting user' 
    }, { status: 500 });
  }
}
