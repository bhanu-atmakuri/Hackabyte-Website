'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import EventsHero from '@/components/events/EventsHero';
import FeaturedEvent from '@/components/events/FeaturedEvent';
import UpcomingEventsList from '@/components/events/UpcomingEventsList';
import EventsRegistration from '@/components/events/EventsRegistration';
import useNoFlash from '@/lib/hooks/useNoFlash';

export default function Events() {
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
        <EventsHero />
        <FeaturedEvent />
        <UpcomingEventsList />
        <EventsRegistration />
      </div>
      <Footer />
    </main>
  );
}