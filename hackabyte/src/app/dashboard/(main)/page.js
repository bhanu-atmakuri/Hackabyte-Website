'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { ensureAdminAuth, ensureRegularUserAuth } from '@/lib/auth/adminAuth';
import useNoFlash from '@/lib/hooks/useNoFlash';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

export default function UserDashboard() {
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  
  // Use the no-flash hook
  useNoFlash();
  
  // Only render content after client-side hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      
      try {
        // If user is an admin, redirect to admin dashboard
        const isAdmin = await ensureAdminAuth();
        if (isAdmin) {
          console.log('Admin user detected, redirecting to admin dashboard');
          router.push('/admin');
          return;
        }
        
        // If user is not logged in at all, redirect to auth page
        const isRegularUser = await ensureRegularUserAuth();
        if (!isRegularUser) {
          console.log('No valid user session, redirecting to login');
          router.push('/auth');
          return;
        }
        
        // Get user info from session storage
        const userEmail = sessionStorage.getItem('userEmail');
        if (userEmail) {
          // Just use the part before @ for the display name
          setUserName(userEmail.split('@')[0]);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isMounted) {
      checkAuth();
    }
  }, [isMounted, router]);

  if (!isMounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1A1A1E]">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A1A1E]">
      <Head>
        <title>Hackabyte | User Dashboard</title>
        <meta name="description" content="User dashboard for Hackabyte" />
      </Head>

      <main className="max-w-7xl mx-auto py-12 px-6 sm:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">User Dashboard</h1>
              <p className="text-gray-400">
                Welcome back, {userName || 'User'}
              </p>
            </div>
          </div>

          {/* Dashboard content would go here */}
          <div className="bg-[#16161A] rounded-xl shadow-md overflow-hidden border border-gray-800 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Your Events</h2>
            <p className="text-gray-400">
              You don't have any upcoming events. Explore our events page to find hackathons and competitions!
            </p>
            
            <div className="mt-6">
              <a 
                href="/dashboard/events" 
                className="inline-flex items-center text-[#FF2247] hover:text-[#FF003C] transition-colors"
              >
                <span>Explore Events</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
