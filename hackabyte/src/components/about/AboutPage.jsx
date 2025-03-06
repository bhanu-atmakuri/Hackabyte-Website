'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AboutHero from '@/components/about/AboutHero';
import Mission from '@/components/about/Mission';
import OurStory from '@/components/about/OurStory';
import TeamSection from '@/components/about/TeamSection';
import VolunteerLeadsSection from '@/components/about/VolunteerLeadsSection';
import Partners from '@/components/about/Partners';
import Container from '@/components/shared/Container';

export default function AboutPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div className="min-h-screen">
      <AboutHero />
      <OurStory />
      <Mission />
      <TeamSection />
      <VolunteerLeadsSection />
      <Partners />
    </div>
  );
}