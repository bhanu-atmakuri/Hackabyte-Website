'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventsHero from '@/components/EventsHero';
import FeaturedEvent from '@/components/FeaturedEvent';
import UpcomingEventsList from '@/components/UpcomingEventsList';
import EventsCalendar from '@/components/EventsCalendar';
import EventsRegistration from '@/components/EventsRegistration';
import useNoFlash from '@/hooks/useNoFlash';

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
      <EventsHero />
      <FeaturedEvent />
      <UpcomingEventsList />
      <EventsCalendar />
      <EventsRegistration />
      <Footer />
    </main>
  );
}