'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import AboutPage from '@/components/about/AboutPage';
import useNoFlash from '@/lib/hooks/useNoFlash';

export default function About() {
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
    <main className="min-h-screen">
      <Navbar />
      <div className="page-top-spacing">
        <AboutPage />
      </div>
      <Footer />
    </main>
  );
}