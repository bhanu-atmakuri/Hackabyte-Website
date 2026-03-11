'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from '../shared/Container';

export default function OurStory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="py-24 md:py-32 bg-[#0A0A0C] relative" ref={ref}>
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>
      <Container size="half" className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="label-uppercase mb-4 block">Our Journey</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
            Our <span className="heading-gradient">Story</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            How we started and where we're headed
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card-glass rounded-xl p-8 md:p-12"
        >
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-300 mb-6 text-lg leading-relaxed first-letter:text-5xl first-letter:font-black first-letter:text-[#FF2247] first-letter:float-left first-letter:mr-3 first-letter:mt-1">
              Founded in 2023, Hackabyte was created by a team of passionate high school students who had participated in and enjoyed numerous hackathons and coding events. After experiencing firsthand the transformative power of these collaborative environments, they felt inspired to create similar opportunities for other young tech enthusiasts.
            </p>

            <p className="text-gray-400 mb-6 text-lg leading-relaxed">
              Our founding team recognized that many students lack access to engaging, hands-on tech experiences that foster creativity, collaboration, and real-world problem-solving skills. They envisioned Hackabyte as a platform to bridge this gap, making coding more accessible and exciting for students of all backgrounds and experience levels.
            </p>

            <p className="text-gray-400 text-lg leading-relaxed">
              Today, Hackabyte organizes a variety of events including hackathons, coding challenges, and educational workshops, all designed to inspire the next generation of innovators and technologists. We believe in creating inclusive environments where students can learn, build, and connect with like-minded peers and industry mentors.
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
