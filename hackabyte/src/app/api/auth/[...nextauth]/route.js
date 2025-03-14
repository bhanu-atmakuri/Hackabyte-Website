/**
 * NextAuth API Route
 * 
 * This route handles all authentication operations via NextAuth.js including:
 * - Login
 * - Session handling
 * - JWT operations
 */

import NextAuth from 'next-auth/next';
import { authOptions } from '../../../../lib/auth/auth';

/**
 * NextAuth handler for all auth operations
 */
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
