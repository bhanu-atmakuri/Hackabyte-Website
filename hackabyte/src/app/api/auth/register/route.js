import { NextResponse } from 'next/server';
import dbConnect from 'lib/mongodb';
import User from 'models/User';
import { sendWelcomeEmail } from '@/lib/email';

export async function POST(req) {
  try {
    await dbConnect();
    
    const body = await req.json();
    const { 
      name, 
      email, 
      password, 
      phoneNumber,
      school,
      dateOfBirth,
      age,
      parentName,
      parentPhone,
      parentEmail,
      dietaryRestrictions,
      discordUsername
    } = body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'User with this email already exists' },
        { status: 409 }
      );
    }
    
    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      phoneNumber,
      school,
      dateOfBirth,
      age,
      parentName,
      parentPhone,
      parentEmail,
      discordUsername,
      dietaryRestrictions
    });
    
    // Send welcome email
    await sendWelcomeEmail(user);
    
    // Return success response (excluding sensitive info)
    return NextResponse.json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    }, { status: 201 });
    
  } catch (error) {
    console.error('Registration error:', error);
    
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
      message: 'Error registering user'
    }, { status: 500 });
  }
}
