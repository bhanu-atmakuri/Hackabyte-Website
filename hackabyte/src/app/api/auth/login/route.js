/**
 * Login API Route
 * 
 * Handles user authentication by validating credentials and issuing JWT tokens.
 * Replaces NextAuth.js with custom JWT-based authentication.
 */

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '../../../../lib/db/mongoose';
import User from '../../../../lib/models/User';
import { createToken, setAuthCookie } from '../../../../lib/auth/jwt';

/**
 * POST handler for user login
 * 
 * @param {Request} request - The request object
 * @returns {Response} - JSON response with user data or error
 */
export async function POST(request) {
  try {
    // Parse request body
    const { email, password } = await request.json();

    // Validate inputs
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Find user by email
    const user = await User.findOne({ email });

    // If user not found or password doesn't match
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Compare password with hashed password in database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // If user is not verified
    if (!user.isVerified) {
      return NextResponse.json(
        { success: false, message: 'Please verify your email before logging in' },
        { status: 403 }
      );
    }

    // Create JWT token
    const token = createToken(user);

    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.fullName,
        email: user.email,
        role: user.role,
      },
    });

    // Set auth cookie in response
    response.cookies.set('hackabyte_auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
