'use client';

import { motion } from 'framer-motion';
import Container from '../../shared/Container';

export default function PastEventsHero() {
  return (
    <section className="relative pt-32 pb-20 bg-[#1A1A1E]">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#F93236] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-[#FF2247] rounded-full blur-3xl"></div>
      </div>
      
      <Container>
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#FF2247] mb-6">
              Past Events
            </h1>
            
            <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
              Explore our previous hackathons and events. See the amazing projects, 
              winning teams, and highlights from past Hackabyte competitions.
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
