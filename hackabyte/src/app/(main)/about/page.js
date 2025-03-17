'use client';

import { useEffect, useState } from 'react';
import AboutHero from '@/components/about/AboutHero';
import Mission from '@/components/about/Mission';
import OurStory from '@/components/about/OurStory';
import TeamSection from '@/components/about/TeamSection';
import VolunteerLeadsSection from '@/components/about/VolunteerLeadsSection';
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
      <AboutHero />
      <Mission />
      <OurStory />
      <TeamSection />
      <VolunteerLeadsSection />
      <Partners />
    </main>
  );
}