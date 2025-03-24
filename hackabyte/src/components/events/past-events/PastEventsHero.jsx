'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from '@/components/shared/Container';

export default function PastEventsHero() {
  // Reference for scroll-triggered animations
  const ref = useRef(null);
  // Detect when section enters viewport
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="pt-20 pb-12 bg-[#1A1A1E]" ref={ref}>
      <Container>
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              Past <span className="text-[#FF2247]">Events</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
              Explore our past events and see the amazing projects, collaborations, and innovations that emerged from our hackathons.
            </p>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#FF2247]/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#FF2247]/5 rounded-full blur-3xl -z-10"></div>
      </Container>
    </section>
  );
}
