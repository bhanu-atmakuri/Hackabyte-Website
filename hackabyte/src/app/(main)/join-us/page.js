'use client';

import { useEffect, useState } from 'react';
import JoinUsHero from '@/components/join-us/JoinUsHero';
import VolunteerOpportunities from '@/components/join-us/VolunteerOpportunities';
import MentorProgram from '@/components/join-us/MentorProgram';
import SponsorShipOptions from '@/components/join-us/SponsorShipOptions';
import useNoFlash from '@/lib/hooks/useNoFlash';

export default function JoinUs() {
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
      <JoinUsHero />
      <VolunteerOpportunities />
      <MentorProgram />
      {/*<JoinTeam />*/}
      <SponsorShipOptions />
    </main>
  );
}