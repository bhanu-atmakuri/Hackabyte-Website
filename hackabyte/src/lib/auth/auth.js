/**
 * Authentication Configuration and Utilities
 * 
 * This file provides authentication helper functions for our custom JWT-based authentication
 * that replaces NextAuth.js with a compatible API structure.
 */

import bcrypt from 'bcryptjs';
<<<<<<< HEAD
=======
import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
>>>>>>> parent of a4cce8d (WIP)
import connectDB from '../db/mongoose';
import User from '../models/User';
import { createToken, verifyToken } from './jwt';

/**
<<<<<<< HEAD
 * Validates user credentials against the database
 * 
 * @param {Object} credentials - User login credentials
 * @param {string} credentials.email - User email
 * @param {string} credentials.password - User password
 * @returns {Promise<Object|null>} User object or null if validation fails
 */
export async function validateCredentials(credentials) {
  if (!credentials?.email || !credentials?.password) {
    return null;
  }

  try {
    await connectDB();
    
    const user = await User.findOne({ email: credentials.email });
    
    if (!user) {
      return null;
    }
    
    const isPasswordMatch = await bcrypt.compare(credentials.password, user.password);
    
    if (!isPasswordMatch) {
      return null;
    }
    
    return {
      id: user._id.toString(),
      name: user.fullName,
      email: user.email,
      role: user.role || 'user',
    };
  } catch (error) {
    console.error('Auth error:', error);
    return null;
  }
}

/**
 * Creates a session object from the provided user data
 * 
 * @param {Object} user - Authenticated user object
 * @returns {Object} Session object in NextAuth compatible format
 */
export function createSession(user) {
  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role || 'user',
    },
  };
}

/**
 * Authentication configuration options
 * Provided for compatibility with existing code
=======
 * NextAuth configuration options
>>>>>>> parent of a4cce8d (WIP)
 */
export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth',
    error: '/auth',
  },
};
