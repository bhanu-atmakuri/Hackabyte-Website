'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import Section from '@/components/shared/Section';
import SignOutButton from '@/components/shared/SignOutButton';
import useNoFlash from '@/lib/hooks/useNoFlash';

export default function DashboardLayout({ children }) {
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
  
  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth');
    }
  }, [status, router]);
  
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

  // Determine which dashboard navigation item is active
  const isProfileActive = pathname === '/dashboard' || pathname.includes('/dashboard/profile') || pathname.includes('/dashboard/security');
  const isRegistrationsActive = pathname.includes('/dashboard/registrations');

  return (
    <main className="min-h-screen bg-[#1A1A1E]">
      <Navbar />
      <ToastContainer position="top-right" autoClose={5000} theme="dark" />
      
      <Section containerSize="default">
        <div className="py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-white">My Dashboard</h1>
            <SignOutButton />
          </div>
          
          {/* Dashboard Tabs */}
          <div className="mb-8 border-b border-gray-800">
            <div className="flex space-x-6">
              <a
                href="/dashboard"
                className={`pb-4 px-2 text-lg font-medium border-b-2 ${
                  isProfileActive
                    ? 'text-[#FF2247] border-[#FF2247]'
                    : 'text-gray-400 border-transparent hover:text-white'
                } transition-colors`}
              >
                Profile
              </a>
              <a
                href="/dashboard/registrations"
                className={`pb-4 px-2 text-lg font-medium border-b-2 ${
                  isRegistrationsActive
                    ? 'text-[#FF2247] border-[#FF2247]'
                    : 'text-gray-400 border-transparent hover:text-white'
                } transition-colors`}
              >
                My Registrations
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
