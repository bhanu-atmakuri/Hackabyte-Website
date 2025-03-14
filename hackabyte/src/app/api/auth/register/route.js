/**
 * User Registration API Route
 * 
 * Handles new user account creation:
 * - Validates user input
 * - Creates new user in database
 * - Sends verification email
 * - Returns appropriate response
 */

import { NextResponse } from 'next/server';
import crypto from 'crypto';
import connectDB from '../../../../lib/db/mongoose';
import User from '../../../../lib/models/User';
import { sendVerificationEmail } from '../../../../lib/email/emailService';

/**
 * POST handler for user registration
 * @param {Request} request - Next.js request object
 * @returns {Promise<NextResponse>} - JSON response
 */
export async function POST(request) {
  try {
    const body = await request.json();
    
    // Extract required fields from request
    const { 
      fullName, 
      email, 
      password,
      phoneNumber,
      school,
      age,
      parentName,
      parentPhone,
      parentEmail
    } = body;
    
    // Validate required fields
    if (!fullName || !email || !password || !school || !age || !parentName || !parentPhone || !parentEmail) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Connect to database
    await connectDB();
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 409 }
      );
    }
    
    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    
    // Create new user
    const newUser = new User({
      fullName,
      email,
      password,
      phoneNumber,
      school,
      age,
      parentName,
      parentPhone,
      parentEmail,
      verificationToken
    });
    
    // Save user to database
    await newUser.save();
    
    // Send verification email
    await sendVerificationEmail(email, fullName, verificationToken);
    
    // Return success response (without sensitive data)
    return NextResponse.json(
      {
        message: 'User registered successfully. Please check your email to verify your account.',
        user: {
          id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    
    return NextResponse.json(
      { message: 'Failed to register user', error: error.message },
      { status: 500 }
    );
  }
}
