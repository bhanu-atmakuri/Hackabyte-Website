'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HackathonsHero from '@/components/HackathonsHero';
import UpcomingHackathons from '@/components/UpcomingHackathons';
import HackathonInfo from '@/components/HackathonInfo';
import HackathonPrizes from '@/components/HackathonPrizes';
import HackathonRules from '@/components/HackathonRules';
import useNoFlash from '@/hooks/useNoFlash';

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
      <HackathonsHero />
      <UpcomingHackathons />
      <HackathonInfo />
      <HackathonPrizes />
      <HackathonRules />
      <Footer />
    </main>
  );
}