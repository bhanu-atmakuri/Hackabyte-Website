/**
 * NextAuth API Route
 * 
 * This route handles all authentication operations via NextAuth.js including:
 * - Login
 * - Session handling
 * - JWT operations
 */

import { handlers } from 'next-auth/next';
import { authOptions } from '../../../../lib/auth/auth';

/**
 * NextAuth handlers for GET and POST operations
 * Using App Router specific pattern
 */
export const { GET, POST } = handlers(authOptions);
