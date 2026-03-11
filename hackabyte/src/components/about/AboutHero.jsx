'use client';

import { motion } from 'framer-motion';
import Container from '../shared/Container';

export default function AboutHero() {
  const stats = [
    { value: "5,000+", label: "Students Impacted" },
    { value: "75+", label: "Events Hosted" },
    { value: "30+", label: "Partner Schools" }
  ];

  return (
    <section className="relative pt-24 md:pt-40 pb-24 md:pb-32 bg-[#0A0A0C] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none"></div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#F93236]/8 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-[#FF2247]/6 rounded-full blur-[100px]"></div>
      </div>

      <Container className="relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="label-uppercase mb-6 block">About Us</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6">
              About <span className="heading-gradient">Hackabyte</span>
            </h1>

            <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Empowering the next generation of innovators through immersive coding experiences,
              community building, and real-world problem solving.
            </p>

            {/* Stats in glass cards */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="card-glass rounded-xl px-8 py-6 min-w-[160px]"
                >
                  <span className="text-3xl md:text-4xl font-black tracking-tight heading-gradient block mb-1">{stat.value}</span>
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
