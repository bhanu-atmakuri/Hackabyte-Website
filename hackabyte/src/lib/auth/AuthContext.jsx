/**
 * Authentication Context Provider
 * 
 * Provides authentication state and methods for client components
 * to replace next-auth/react client-side functionality
 */

'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

// Create the authentication context
const AuthContext = createContext({
  user: null,
  status: 'loading', // 'loading', 'authenticated', 'unauthenticated'
  signIn: async () => {},
  signOut: async () => {},
  refresh: async () => {},
});

/**
 * Authentication Provider Component
 * 
 * @param {Object} props - Component props
 * @returns {JSX.Element} AuthProvider component
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('loading');
  const router = useRouter();

  // Initial session check
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if user is logged in
        const token = Cookies.get('hackabyte_auth_token');
        
        if (!token) {
          setStatus('unauthenticated');
          return;
        }

        const response = await fetch('/api/users/me');
        
        if (!response.ok) {
          setStatus('unauthenticated');
          return;
        }
        
        const data = await response.json();
        
        if (data.success && data.user) {
          setUser(data.user);
          setStatus('authenticated');
        } else {
          setStatus('unauthenticated');
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setStatus('unauthenticated');
      }
    };

    checkAuth();
  }, []);

  /**
   * Sign in a user with credentials
   * 
   * @param {Object} credentials - User credentials
   * @param {Object} options - Sign in options
   * @returns {Object} Sign in result
   */
  const signIn = async (credentials, options = {}) => {
    try {
      setStatus('loading');
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setStatus('unauthenticated');
        return { error: data.message || 'Sign in failed' };
      }
      
      // Set user data
      setUser(data.user);
      setStatus('authenticated');
      
      // Redirect if needed
      if (!options.redirect === false && options.callbackUrl) {
        router.push(options.callbackUrl);
      } else if (!options.redirect === false) {
        router.push('/dashboard');
      }
      
      return { ok: true };
    } catch (error) {
      console.error('Sign in error:', error);
      setStatus('unauthenticated');
      return { error: 'An unexpected error occurred' };
    }
  };

  /**
   * Sign out the current user
   */
  const signOut = async (options = {}) => {
    try {
      setStatus('loading');
      
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
      
      // Clear user data
      setUser(null);
      setStatus('unauthenticated');
      
      // Redirect if needed
      if (!options.redirect === false) {
        router.push('/auth');
      }
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  /**
   * Refresh the user session
   */
  const refresh = async () => {
    try {
      const response = await fetch('/api/users/me');
      
      if (!response.ok) {
        setUser(null);
        setStatus('unauthenticated');
        return;
      }
      
      const data = await response.json();
      
      if (data.success && data.user) {
        setUser(data.user);
        setStatus('authenticated');
      } else {
        setUser(null);
        setStatus('unauthenticated');
      }
    } catch (error) {
      console.error('Session refresh error:', error);
      setUser(null);
      setStatus('unauthenticated');
    }
  };

  // Value for the context provider
  const value = {
    user,
    status,
    signIn,
    signOut,
    refresh,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Custom hook to use the auth context
 * 
 * @returns {Object} Auth context
 */
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}

/**
 * Custom hook to replace next-auth's useSession
 * 
 * @returns {Object} Session data and status
 */
export function useSession() {
  const { user, status } = useAuth();
  
  return {
    data: user ? { user } : null,
    status,
  };
}

/**
 * Sign in function that mimics next-auth's signIn
 * 
 * @param {String} provider - Authentication provider (only 'credentials' supported)
 * @param {Object} credentials - User credentials
 * @param {Object} options - Sign in options
 * @returns {Object} Sign in result
 */
export function signIn(provider, credentials, options = {}) {
  // We only support credentials provider in our custom implementation
  if (provider !== 'credentials') {
    throw new Error('Only credentials provider is supported');
  }
  
  const { signIn } = useAuth();
  return signIn(credentials, options);
}

/**
 * Sign out function that mimics next-auth's signOut
 * 
 * @param {Object} options - Sign out options
 * @returns {Promise} Sign out result
 */
export function signOut(options = {}) {
  const { signOut } = useAuth();
  return signOut(options);
}
