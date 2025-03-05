'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthForm from '@/components/AuthForm';
import useNoFlash from '@/hooks/useNoFlash';

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
      <div className="pt-28 pb-20">
        <AuthForm />
      </div>
      <Footer />
    </main>
  );
}