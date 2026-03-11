'use client';

import { motion } from 'framer-motion';
import Container from '../shared/Container';

export default function EventsHero() {
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
            <span className="label-uppercase mb-6 block">Hackabyte Events</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6">
              Discover Our <span className="heading-gradient">Events</span>
            </h1>

            <p className="text-lg text-gray-400 mb-10 max-w-3xl mx-auto">
              Discover our schedule of hackathons, workshops, and tech challenges
              designed to inspire and empower the next generation of innovators.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mt-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <a href="#upcoming" className="btn-primary block w-full text-center">
                  Upcoming Events
                </a>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <a href="/events/past-events" className="btn-secondary block w-full text-center">
                  Past Events
                </a>
              </motion.div>
            </div>

            <div className="flex flex-wrap justify-center gap-6 mt-16">
              {[
                { number: "15+", label: "Events Per Year" },
                { number: "12", label: "Cities" },
                { number: "3", label: "Age Groups" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="card-glass rounded-xl px-8 py-6 min-w-[140px]"
                >
                  <span className="text-3xl md:text-4xl font-black tracking-tight heading-gradient block mb-1">{stat.number}</span>
                  <span className="text-gray-500 text-sm">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
