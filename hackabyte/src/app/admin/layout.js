'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import Section from '@/components/shared/Section';
import useNoFlash from '@/lib/hooks/useNoFlash';

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  
  // Use the no-flash hook
  useNoFlash();
  
  // Only render content after client-side hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Verify admin access
  useEffect(() => {
    // Check if authenticated
    if (status === 'unauthenticated') {
      router.push('/auth');
      return;
    }
    
    // Check if user is admin
    if (status === 'authenticated' && session?.user?.role !== 'admin') {
      toast.error('Access denied. Admin privileges required.');
      setTimeout(() => {
        router.push('/');
      }, 2000);
    }
  }, [status, session, router]);
  
  // Show loading state while checking authentication or before hydration
  if (!isMounted || status === 'loading') {
    return (
      <div className="min-h-screen bg-[#1A1A1E] flex items-center justify-center">
        <div className="animate-pulse text-gray-400">
          <svg className="animate-spin h-10 w-10 text-[#FF2247]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      </div>
    );
  }
  
  // If not admin, show nothing (will redirect)
  if (status === 'authenticated' && session?.user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#1A1A1E] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-300 mb-6">You don't have permission to access this area.</p>
          <p className="text-gray-300">Redirecting...</p>
        </div>
      </div>
    );
  }

  // Determine which admin navigation item is active
  const isUsersActive = pathname.includes('/admin/users');
  const isEventsActive = pathname.includes('/admin/events') || pathname === '/admin';

  return (
    <main className="min-h-screen bg-[#1A1A1E]">
      <Navbar />
      <ToastContainer position="top-right" autoClose={5000} theme="dark" />
      
      <Section containerSize="default">
        <div className="py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
          </div>
          
          {/* Admin Navigation */}
          <div className="mb-8 border-b border-gray-800">
            <div className="flex space-x-6">
              <a
                href="/admin/events"
                className={`pb-4 px-2 text-lg font-medium border-b-2 ${
                  isEventsActive
                    ? 'text-[#FF2247] border-[#FF2247]'
                    : 'text-gray-400 border-transparent hover:text-white'
                } transition-colors`}
              >
                Events
              </a>
              <a
                href="/admin/users"
                className={`pb-4 px-2 text-lg font-medium border-b-2 ${
                  isUsersActive
                    ? 'text-[#FF2247] border-[#FF2247]'
                    : 'text-gray-400 border-transparent hover:text-white'
                } transition-colors`}
              >
                Users
              </a>
            </div>
          </div>
          
          {/* Content */}
          <div className="min-h-[400px]">
            {children}
          </div>
        </div>
      </Section>
      
      <Footer />
    </main>
  );
}
