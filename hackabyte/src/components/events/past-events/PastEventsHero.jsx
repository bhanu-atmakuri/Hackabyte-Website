'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from '@/components/shared/Container';

export default function PastEventsHero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="pt-32 md:pt-40 pb-16 bg-[#0A0A0C] relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#FF2247]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#FF2247]/5 rounded-full blur-3xl"></div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="label-uppercase mb-6 block">Archive</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6">
            Past <span className="heading-gradient">Events</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Explore our past events and see the amazing projects, collaborations, and innovations that emerged from our hackathons.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
