'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import UserProfileCard from '@/components/dashboard/UserProfileCard';
import UserRegistrations from '@/components/dashboard/UserRegistrations';
import Section from '@/components/shared/Section';
import useNoFlash from '@/lib/hooks/useNoFlash';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
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

  return (
    <main className="min-h-screen bg-[#1A1A1E]">
      <Navbar />
      <ToastContainer position="top-right" autoClose={5000} theme="dark" />
      
      <Section containerSize="default">
        <div className="py-8">
          <h1 className="text-4xl font-bold text-white mb-8">My Dashboard</h1>
          
          {/* Dashboard Tabs */}
          <div className="mb-8 border-b border-gray-800">
            <div className="flex space-x-6">
              <button
                className={`pb-4 px-2 text-lg font-medium border-b-2 ${
                  activeTab === 'profile'
                    ? 'text-[#FF2247] border-[#FF2247]'
                    : 'text-gray-400 border-transparent hover:text-white'
                } transition-colors`}
                onClick={() => setActiveTab('profile')}
              >
                Profile
              </button>
              <button
                className={`pb-4 px-2 text-lg font-medium border-b-2 ${
                  activeTab === 'registrations'
                    ? 'text-[#FF2247] border-[#FF2247]'
                    : 'text-gray-400 border-transparent hover:text-white'
                } transition-colors`}
                onClick={() => setActiveTab('registrations')}
              >
                My Registrations
              </button>
            </div>
          </div>
          
          {/* Active Tab Content */}
          <div className="min-h-[400px]">
            {activeTab === 'profile' && <UserProfileCard />}
            {activeTab === 'registrations' && <UserRegistrations />}
          </div>
        </div>
      </Section>
      
      <Footer />
    </main>
  );
}
