'use client';

import { useEffect, useState } from 'react';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import AgeGroups from '@/components/home/AgeGroups';
import Testimonials from '@/components/home/Testimonials';
import UpcomingEvents from '@/components/home/UpcomingEvents';
import Newsletter from '@/components/shared/Newsletter';
import useNoFlash from '@/lib/hooks/useNoFlash';

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
    <>
      <Hero />
      <Features />
      <AgeGroups />
      <Testimonials />
      <UpcomingEvents />
      <Newsletter />
    </>
  );
}
