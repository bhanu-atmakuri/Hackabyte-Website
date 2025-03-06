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
    
    // Clean up function (not strictly necessary in this case but good practice)
    return () => {
      // This would only run if the component using this hook unmounts
      // which is unlikely for layout components
    };
  }, []); // Empty dependency array ensures this only runs once
  
  return null;
}