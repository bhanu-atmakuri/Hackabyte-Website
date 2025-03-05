'use client';

import { useEffect } from 'react';

/**
 * This hook prevents flash of unstyled content during hydration
 * by hiding the body until hydration is complete
 */
export default function useNoFlash() {
  useEffect(() => {
    // This runs only on the client, after hydration
    document.documentElement.classList.add('hydrated');
  }, []);
  
  return null;
}