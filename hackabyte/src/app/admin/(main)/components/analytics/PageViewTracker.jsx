'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackPageView } from '@/lib/firebase/analyticsService';

export default function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const previousPathname = useRef('');

  useEffect(() => {
    // Only track if the path changed (prevents duplicate events during navigation)
    if (pathname !== previousPathname.current) {
      // Get page title from the document or use pathname
      const pageTitle = document.title || pathname;
      
      // Track the page view
      trackPageView(pageTitle, {
        path: pathname,
        search: searchParams.toString()
      });
      
      // Update the previous pathname
      previousPathname.current = pathname;
    }
  }, [pathname, searchParams]);

  // This component doesn't render anything
  return null;
}
