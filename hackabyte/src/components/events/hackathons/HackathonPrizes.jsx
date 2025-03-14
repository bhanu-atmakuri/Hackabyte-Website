/**
 * Hackathon Prizes Component
 * 
 * Displays the prize structure for Hackabyte hackathon events featuring:
 * - Visually distinct cards for first, second, and third place prizes
 * - Animated prize amounts with emphasizing design elements
 * - Gradient backgrounds and hover effects for visual appeal
 * - Additional information about runner-up and honorable mention prizes
 * - Responsive layout that adapts to different screen sizes
 * - Scroll-triggered animations for visual engagement
 */

'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from '@/components/shared/Container';

export default function HackathonPrizes() {
  // Reference for scroll-triggered animations
  const ref = useRef(null);
  // Detect when section enters viewport (20% visibility triggers animation)
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-20 bg-[#16161A]" ref={ref}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#FF2247]">
            Prizes
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            MORE THAN $3000 IN PRIZES!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* First Place */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-xl overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#F93236] to-[#FF2247] opacity-40 rounded-xl"></div>
            <div className="bg-[#1A1A1E] border-2 border-[#F93236] rounded-xl overflow-hidden relative z-10 transform transition-transform duration-300 hover:scale-105 h-full">
              <div className="p-8 flex flex-col items-center justify-center h-full">
                <div className="w-16 h-16 rounded-full bg-[#F93236] flex items-center justify-center mb-6 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">FIRST PLACE</h3>
                <p className="text-gray-300 text-center mb-4">Highest scored project receives a grand total of</p>
                <div className="text-5xl font-bold text-[#F93236] mb-6">$250</div>
              </div>
            </div>
          </motion.div>

          {/* Second Place */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-xl overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#333333] to-[#555555] opacity-40 rounded-xl"></div>
            <div className="bg-[#1A1A1E] border-2 border-[#FF2247] rounded-xl overflow-hidden relative z-10 transform transition-transform duration-300 hover:scale-105 h-full">
              <div className="p-8 flex flex-col items-center justify-center h-full">
                <div className="w-16 h-16 rounded-full bg-[#FF2247] flex items-center justify-center mb-6 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">SECOND PLACE</h3>
                <p className="text-gray-300 text-center mb-4">Second highest scored project receives a grand total of</p>
                <div className="text-5xl font-bold text-[#FF2247] mb-6">$175</div>
              </div>
            </div>
          </motion.div>

          {/* Third Place */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="rounded-xl overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#333333] to-[#555555] opacity-40 rounded-xl"></div>
            <div className="bg-[#1A1A1E] border-2 border-[#FF003C] rounded-xl overflow-hidden relative z-10 transform transition-transform duration-300 hover:scale-105 h-full">
              <div className="p-8 flex flex-col items-center justify-center h-full">
                <div className="w-16 h-16 rounded-full bg-[#FF003C] flex items-center justify-center mb-6 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">THIRD PLACE</h3>
                <p className="text-gray-300 text-center mb-4">Third highest scored project receives a grand total of</p>
                <div className="text-5xl font-bold text-[#FF003C] mb-6">$100</div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 bg-[#1A1A1E] p-8 rounded-xl border border-gray-800 text-center"
        >
          <p className="text-xl text-white max-w-3xl mx-auto">
            There is a $75 prize for 3 runner-ups and $50 for honorable mentions, awarded to 6 teams, along with additional awards from sponsors!
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
