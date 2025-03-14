/**
 * Our Story Component
 * 
 * Displays the organizational history and founding story of Hackabyte with:
 * - Narrative presentation of the organization's origins and purpose
 * - Storytelling approach that shares the founders' vision
 * - Thematic styling consistent with the brand
 * - Scroll-triggered animations for visual engagement
 * - Responsive typography that adapts to different screen sizes
 * - Container layout with proper spacing and margins
 */

'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from '../shared/Container';

export default function OurStory() {
  // Reference for scroll-triggered animations
  const ref = useRef(null);
  // Detect when section enters viewport (30% visibility triggers animation)
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="py-20 bg-[#1A1A1E]" ref={ref}>
      <Container size = "half">
        {/* Section heading with fade-in and slide-up animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#FF2247]">
            Our Story
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            How we started and where we're headed
          </p>
        </motion.div>

        {/* Main content card with founding story and animated entrance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#16161A] p-8 md:p-12 rounded-xl border border-gray-800"
        >
          {/* Story paragraphs with narrative flow and consistent styling */}
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-300 mb-6 text-lg">
              Founded in 2023, Hackabyte was created by a team of passionate high school students who had participated in and enjoyed numerous hackathons and coding events. After experiencing firsthand the transformative power of these collaborative environments, they felt inspired to create similar opportunities for other young tech enthusiasts.
            </p>

            <p className="text-gray-300 mb-6 text-lg">
              Our founding team recognized that many students lack access to engaging, hands-on tech experiences that foster creativity, collaboration, and real-world problem-solving skills. They envisioned Hackabyte as a platform to bridge this gap, making coding more accessible and exciting for students of all backgrounds and experience levels.
            </p>

            <p className="text-gray-300 text-lg">
              Today, Hackabyte organizes a variety of events including hackathons, coding challenges, and educational workshops, all designed to inspire the next generation of innovators and technologists. We believe in creating inclusive environments where students can learn, build, and connect with like-minded peers and industry mentors.
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
