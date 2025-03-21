'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '@/app/firebaseConfig';
import { onAuthStateChanged, getIdToken } from 'firebase/auth';
import { checkAdminStatus } from '@/lib/firebase/firebaseClient';
import Cookies from 'js-cookie';

// Create the context
const AuthContext = createContext({
  user: null,
  isAdmin: false,
  loading: true,
});

// Auth provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        setUser(authUser);
        
        // Check if user is an admin
        const adminStatus = await checkAdminStatus(authUser.uid);
        setIsAdmin(adminStatus);
        
        if (adminStatus) {
          // Get token for admin user
          const token = await getIdToken(authUser);
          
          // Store token in a cookie (secure in production)
          Cookies.set('admin_token', token, { 
            expires: 1, // 1 day
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax'
          });
          
          // Also keep session storage for client-side checks
          sessionStorage.setItem('adminLoggedIn', 'true');
          sessionStorage.setItem('adminEmail', authUser.email);
          sessionStorage.setItem('adminId', authUser.uid);
        }
      } else {
        setUser(null);
        setIsAdmin(false);
        
        // Remove admin cookie and session storage
        Cookies.remove('admin_token');
        sessionStorage.removeItem('adminLoggedIn');
        sessionStorage.removeItem('adminEmail');
        sessionStorage.removeItem('adminId');
      }
      
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Context value
  const value = {
    user,
    isAdmin,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
}
