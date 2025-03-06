'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import LumaHero from '@/components/luma/LumaHero';
import LumaAbout from '@/components/luma/LumaAbout';
import LumaClasses from '@/components/luma/LumaClasses';
import LumaTeam from '@/components/luma/LumaTeam';
import LumaVolunteer from '@/components/luma/LumaVolunteer';
import useNoFlash from '@/lib/hooks/useNoFlash';

export default function Luma() {
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
        <LumaHero />
        <LumaAbout />
        <LumaClasses />
        <LumaTeam />
        <LumaVolunteer />
      </div>
      <Footer />
    </main>
  );
}