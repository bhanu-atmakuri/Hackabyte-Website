/**
 * Server-side Authentication Utilities
 * 
 * Contains functions for server-side authentication verification
 * to replace next-auth/next's getServerSession functionality
 */

import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';

/**
 * Get the current user session from cookies (server-side)
 * 
 * @returns {Object|null} Session object or null if not authenticated
 */
export async function getServerSession() {
  const cookieStore = cookies();
  const token = cookieStore.get('hackabyte_auth_token')?.value;
  
  if (!token) {
    return null;
  }
  
  try {
    // Verify the token
    const decoded = verify(token, process.env.NEXTAUTH_SECRET);
    
    // Return session format similar to NextAuth for compatibility
    return {
      user: {
        id: decoded.id,
        name: decoded.name,
        email: decoded.email,
        role: decoded.role || 'user',
      },
    };
  } catch (error) {
    console.error('Authentication token verification error:', error);
    return null;
  }
}

/**
 * Check if the current user has admin role
 * 
 * @returns {Boolean} True if user is admin, false otherwise
 */
export async function isAdmin() {
  const session = await getServerSession();
  
  if (!session) {
    return false;
  }
  
  return session.user.role === 'admin';
}
