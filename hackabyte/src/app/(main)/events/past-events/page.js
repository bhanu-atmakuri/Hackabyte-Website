'use client';

import { useEffect, useState } from 'react';
import BasePageLayout from '@/components/shared/BasePageLayout';
import PastEventsHero from '@/components/events/past-events/PastEventsHero';
import PastEventsList from '@/components/events/past-events/PastEventsList';
import useNoFlash from '@/lib/hooks/useNoFlash';

export default function PastEvents() {
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
    <BasePageLayout>
      <PastEventsHero />
      <PastEventsList />
    </BasePageLayout>
  );
}
