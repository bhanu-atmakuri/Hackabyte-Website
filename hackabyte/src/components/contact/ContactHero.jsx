'use client';

import { motion } from 'framer-motion';
import Container from '../shared/Container';

export default function ContactHero() {
  return (
    <section className="relative pt-32 md:pt-40 pb-24 bg-[#0A0A0C] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#F93236] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-[#FF2247] rounded-full blur-3xl"></div>
      </div>

      <Container className="relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="label-uppercase mb-6 block">Reach Out</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6">
              Contact <span className="heading-gradient">Us</span>
            </h1>

            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Have questions or want to get involved? We'd love to hear from you.
              Reach out to our team for inquiries about events, mentorship,
              partnerships, or anything else.
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
