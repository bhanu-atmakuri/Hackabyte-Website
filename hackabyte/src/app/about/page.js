'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AboutHero from '@/components/AboutHero';
import Mission from '@/components/Mission';
import Team from '@/components/Team';
import Journey from '@/components/Journey';
import Partners from '@/components/Partners';
import useNoFlash from '@/hooks/useNoFlash';

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
      <AboutHero />
      <Mission />
      <Journey />
      <Team />
      <Partners />
      <Footer />
    </main>
  );
}