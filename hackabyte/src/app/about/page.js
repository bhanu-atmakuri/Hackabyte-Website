'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import AboutHero from '@/components/about/AboutHero';
import Mission from '@/components/about/Mission';
import Team from '@/components/about/Team';
import Journey from '@/components/about/Journey';
import Partners from '@/components/about/Partners';
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
        <AboutHero />
        <Mission />
        <Journey />
        <Team />
        <Partners />
      </div>
      <Footer />
    </main>
  );
}