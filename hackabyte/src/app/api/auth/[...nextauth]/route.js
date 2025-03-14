/**
 * NextAuth API Route for App Router
 * 
 * This implements the NextAuth.js authentication for Next.js App Router.
 * Using the recommended pattern for Next.js 15 and ESM modules.
 */

import NextAuth from 'next-auth';
import { authOptions } from '../../../../lib/auth/auth.js';

/**
 * Configure the NextAuth handler with our options
 */
const handler = NextAuth(authOptions);

/**
 * Export the handler functions directly as named exports
 * This is the recommended pattern for App Router in Next.js 15+
 */
export const GET = handler;
export const POST = handler;
