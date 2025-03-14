/**
 * JWT Authentication Utility Functions
 * 
 * This file provides JWT token generation, verification, and authentication utilities
 * to replace NextAuth.js with a custom authentication system.
 */

import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { decode, verify } from 'jsonwebtoken';

// JWT Token name in cookies
const AUTH_TOKEN_NAME = 'hackabyte_auth_token';

/**
 * Create a JWT token for a user
 * 
 * @param {Object} user - User object containing id, email, and role
 * @returns {String} JWT token
 */
export const createToken = (user) => {
  const payload = {
    id: user.id || user._id.toString(),
    email: user.email,
    role: user.role || 'user',
    name: user.fullName || user.name,
  };

  return jwt.sign(payload, process.env.NEXTAUTH_SECRET, {
    expiresIn: '30d', // 30 days
  });
};

/**
 * Verify a JWT token
 * 
 * @param {String} token - JWT token to verify
 * @returns {Object|null} Decoded token payload or null if invalid
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.NEXTAUTH_SECRET);
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
};

/**
 * Set the authentication token in HttpOnly cookie
 * 
 * @param {Object} res - Response object
 * @param {String} token - JWT token
 */
export const setAuthCookie = (res, token) => {
  // Set cookie to expire in 30 days
  const expires = new Date();
  expires.setDate(expires.getDate() + 30);

  // Set the cookie with HttpOnly flag for security
  res.cookies.set(AUTH_TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires,
    path: '/',
  });
};

/**
 * Remove the authentication token cookie
 * 
 * @param {Object} res - Response object
 */
export const clearAuthCookie = (res) => {
  res.cookies.set(AUTH_TOKEN_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(0),
    path: '/',
  });
};

/**
 * Get the current authenticated user from the request cookies
 * 
 * @returns {Object|null} User object or null if not authenticated
 */
export const getAuthUser = () => {
  const cookieStore = cookies();
  const token = cookieStore.get(AUTH_TOKEN_NAME)?.value;

  if (!token) {
    return null;
  }

  try {
    return verify(token, process.env.NEXTAUTH_SECRET);
  } catch (error) {
    console.error('Auth token verification error:', error);
    return null;
  }
};

/**
 * Authentication middleware for API routes
 * 
 * @param {Function} handler - API route handler
 * @returns {Function} Middleware-wrapped handler
 */
export const withAuth = (handler) => {
  return async (req, res) => {
    const user = getAuthUser();

    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Add user to the request object
    req.user = user;

    // Continue to the handler
    return handler(req, res);
  };
};

/**
 * Role-based authorization middleware for API routes
 * 
 * @param {Function} handler - API route handler
 * @param {String[]} roles - Array of allowed roles
 * @returns {Function} Middleware-wrapped handler
 */
export const withRole = (handler, roles = ['admin']) => {
  return async (req, res) => {
    const user = getAuthUser();

    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!roles.includes(user.role)) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Add user to the request object
    req.user = user;

    // Continue to the handler
    return handler(req, res);
  };
};
