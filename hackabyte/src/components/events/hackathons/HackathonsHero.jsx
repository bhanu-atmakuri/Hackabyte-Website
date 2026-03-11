'use client';

import Container from '@/components/shared/Container';
import { motion } from 'framer-motion';

export default function HackathonsHero() {
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
            <span className="label-uppercase mb-6 block">Compete & Create</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-8">
              <span className="heading-gradient">Hackathons</span>
            </h1>

            <div className="card-glass rounded-xl p-8 md:p-10 max-w-4xl mx-auto text-left">
              <h2 className="text-2xl font-black tracking-tight text-white mb-4">What is a Hackathon?</h2>

              <p className="text-gray-400 mb-6 leading-relaxed">
                Hackathons are events where students with an interest in STEM come together to collaborate on innovative projects,
                learn new skills from various workshops, and network with peers in a weekend full of coding and collaboration.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    ),
                    title: "Team Building",
                    description: "Form teams of 1-4 people to tackle challenges together and build innovative solutions."
                  },
                  {
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    ),
                    title: "Learning",
                    description: "Attend workshops and talks from industry experts to expand your skills and knowledge."
                  },
                  {
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                      </svg>
                    ),
                    title: "Rewards",
                    description: "Compete for over $3,000 in prizes while building your portfolio and making connections."
                  }
                ].map((feature) => (
                  <div key={feature.title} className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-5 hover:border-white/[0.12] transition-all duration-300">
                    <div className="w-10 h-10 flex items-center justify-center bg-[#F93236]/10 border border-[#F93236]/20 rounded-lg text-[#FF2247] mb-3">
                      {feature.icon}
                    </div>
                    <h3 className="text-base font-bold tracking-tight text-white mb-1">{feature.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row flex-wrap justify-center gap-4">
              <motion.a
                href="/events#registration"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary inline-block text-center"
              >
                Register Now
              </motion.a>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
