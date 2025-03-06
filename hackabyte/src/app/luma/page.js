'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import LumaHero from '@/components/luma/LumaHero';
import LumaAbout from '@/components/luma/LumaAbout';
import LumaOffers from '@/components/luma/LumaOffers';
import LumaTeam from '@/components/luma/LumaTeam';
import LumaJoin from '@/components/luma/LumaJoin';
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
        <LumaOffers />
        <LumaTeam />
        <LumaJoin />
      </div>
      <Footer />
    </main>
  );
}