'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import AuthForm from '@/components/auth/AuthForm';
import Section from '@/components/shared/Section';
import useNoFlash from '@/lib/hooks/useNoFlash';

export default function Auth() {
  const [isMounted, setIsMounted] = useState(false);
  
  // Use the no-flash hook
  useNoFlash();
  
  // Only render content after client-side hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-gray-400">Loading...</div>
    </div>;
  }

  return (
    <main className="min-h-screen bg-[#1A1A1E]">
      <Navbar />
      <div className="page-top-spacing">
        <Section containerSize="narrow">
          <AuthForm />
        </Section>
      </div>
      <Footer />
    </main>
  );
}