'use client';

import BasePageLayout from '@/components/shared/BasePageLayout';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import AgeGroups from '@/components/home/AgeGroups';
import Testimonials from '@/components/home/Testimonials';
import UpcomingEvents from '@/components/home/UpcomingEvents';
import Newsletter from '@/components/shared/Newsletter';

export default function Home() {
  return (
    <BasePageLayout>
      <Hero />
      <Features />
      <AgeGroups />
      <Testimonials />
      <UpcomingEvents />
      <Newsletter />
    </BasePageLayout>
  );
}