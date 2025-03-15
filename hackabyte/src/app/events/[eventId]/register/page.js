'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import EventRegistrationForm from '@/components/events/registration/EventRegistrationForm';
import Section from '@/components/shared/Section';
import useNoFlash from '@/lib/hooks/useNoFlash';

export default function EventRegister({ params }) {
  const { eventId } = params;
  const { data: session, status } = useSession();
  const router = useRouter();
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
      // Store the intended destination for post-login redirect
      const returnUrl = `/events/${eventId}/register`;
      router.push(`/auth?returnUrl=${encodeURIComponent(returnUrl)}`);
    }
  }, [status, router, eventId]);
  
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
  
  // If not authenticated after checking, show nothing (will redirect)
  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#1A1A1E]">
      <Navbar />
      <ToastContainer position="top-right" autoClose={5000} theme="dark" />
      
      <Section containerSize="default">
        <div className="py-8">
          <h1 className="text-4xl font-bold text-white mb-8">Event Registration</h1>
          <EventRegistrationForm eventId={eventId} />
        </div>
      </Section>
      
      <Footer />
    </main>
  );
}
