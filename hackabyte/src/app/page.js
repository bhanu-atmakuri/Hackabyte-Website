'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import AgeGroups from '@/components/AgeGroups';
import Testimonials from '@/components/Testimonials';
import UpcomingEvents from '@/components/UpcomingEvents';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import useNoFlash from '@/hooks/useNoFlash';

export default function Home() {
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
      <Hero />
      <Features />
      <AgeGroups />
      <Testimonials />
      <UpcomingEvents />
      <Newsletter />
      <Footer />
    </main>
  );
}