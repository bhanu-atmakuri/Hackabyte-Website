/**
 * LUMA About Component
 * 
 * About section for the LUMA educational program featuring:
 * - Organization origin story and mission statement
 * - Core values presented in a responsive card layout
 * - Custom LUMA green branding that differs from main Hackabyte styling
 * - Animated content with scroll-triggered reveals
 * - Responsive two-column layout that adapts to different screen sizes
 */

'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from '../shared/Container';

export default function LumaAbout() {
  // Reference for scroll-triggered animations
  const ref = useRef(null);
  // Detect when section enters viewport (30% visibility triggers animation)
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="py-20 bg-[#16161A]" id="about" ref={ref}>
      <Container>
        {/* Section heading with fade-in and slide-up animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#BADA55]">
            About Us
          </h2>
        </motion.div>

        {/* Two-column layout for story and core values */}
        <div className="grid md:grid-cols-2 gap-10 mt-16">
          {/* Left column - "Our Story" with slide-in animation */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#1A1A1E] p-8 rounded-xl border border-gray-800"
          >
            <h3 className="text-2xl font-bold text-[#BADA55] mb-4">Our Story</h3>
            <p className="text-gray-300 mb-4">
              In 2024, Jash and Ekansh, the co-founders of Luma, established the organization to allow 
              young minds to learn coding, irrespective of their skill level. 
            </p>
            <p className="text-gray-300 mb-4">
              Our aim is to empower every student to overcome limitations through engaging coding classes
              that are creative, problem-solving as well as innovative.
            </p>
            <p className="text-gray-300">
              We believe that every child should be educated in basic coding skills irrespective of 
              his or her socio-economic background or experience in the field.
            </p>
          </motion.div>

          {/* Right column - Core values cards with staggered animations */}
          <div className="grid grid-cols-1 gap-6">
            {/* Inclusive Education value card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-[#1A1A1E] p-6 rounded-lg border border-gray-800"
            >
              <div className="text-[#BADA55] mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Inclusive Education</h3>
              <p className="text-gray-400">Creating learning opportunities for students regardless of background or prior experience.</p>
            </motion.div>
            
            {/* Creative Learning value card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-[#1A1A1E] p-6 rounded-lg border border-gray-800"
            >
              <div className="text-[#BADA55] mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Creative Learning</h3>
              <p className="text-gray-400">Fostering innovation and creative problem-solving through engaging, interactive classes.</p>
            </motion.div>
            
            {/* Community Support value card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-[#1A1A1E] p-6 rounded-lg border border-gray-800"
            >
              <div className="text-[#BADA55] mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Community Support</h3>
              <p className="text-gray-400">Building a strong community where learners connect with trainers to thrive in a collaborative environment.</p>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
