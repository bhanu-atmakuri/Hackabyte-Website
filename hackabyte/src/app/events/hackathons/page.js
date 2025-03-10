'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import HackathonsHero from '@/components/events/hackathons/HackathonsHero';
import HackathonInfo from '@/components/events/hackathons/HackathonInfo';
import HackathonPrizes from '@/components/events/hackathons/HackathonPrizes';
import HackathonRules from '@/components/events/hackathons/HackathonRules';
import useNoFlash from '@/lib/hooks/useNoFlash';

export default function Hackathons() {
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
        <HackathonsHero />
        <HackathonInfo />
        <HackathonPrizes />
        <HackathonRules />
      </div>
      <Footer />
    </main>
  );
}
