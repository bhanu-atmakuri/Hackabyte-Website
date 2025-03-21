'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BasePageLayout from '@/components/shared/BasePageLayout';
import Section from '@/components/shared/Section';
import Container from '@/components/shared/Container';
import useNoFlash from '@/lib/hooks/useNoFlash';
import { ensureUserAuth } from '@/lib/auth/adminAuth';

export default function Dashboard() {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  
  // Use the no-flash hook
  useNoFlash();
  
  // Only render content after client-side hydration
  useEffect(() => {
    setIsMounted(true);
    
    // Check if user is logged in
    const checkAuth = async () => {
      const isLoggedIn = await ensureUserAuth();
      if (!isLoggedIn) {
        console.log('User not logged in, redirecting to auth');
        router.push('/auth');
      }
    };
    
    checkAuth();
  }, [router]);
  
  if (!isMounted) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-gray-400">Loading...</div>
    </div>;
  }

  return (
    <BasePageLayout>
      <div className="pt-28 pb-16 bg-[#16161A]">
        <Container>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="heading-gradient">Dashboard</span>
            </h1>
            <p className="text-xl text-gray-300">
              Welcome to your Hackabyte dashboard.
            </p>
          </div>
          
          <Section>
            <div className="bg-[#1A1A1E] p-8 rounded-xl border border-gray-800 text-center">
              <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
              <p className="text-gray-300">
                The dashboard functionality is currently under development. 
                Check back later for updates!
              </p>
            </div>
          </Section>
        </Container>
      </div>
    </BasePageLayout>
  );
}
