/**
 * NextAuth Authentication Configuration
 * 
 * Configures authentication options, providers, and callbacks for NextAuth.js.
 */

import bcrypt from 'bcryptjs';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectDB from '../db/mongoose';
import User from '../models/User';

/**
 * NextAuth configuration options
 * @type {import('next-auth').NextAuthOptions}
 */
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
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
    })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth',
    error: '/auth',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
