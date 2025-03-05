'use client';

import { motion } from 'framer-motion';

export default function HackathonsHero() {
  return (
    <section className="relative pt-32 pb-20 bg-[#1A1A1E]">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#F93236] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-[#FF2247] rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-custom max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#FF2247] mb-6">
              Hackathons
            </h1>
            
            <div className="bg-[#16161A] p-8 rounded-xl border border-gray-800 max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-4">What is a Hackathon?</h2>
              
              <p className="text-lg text-gray-300 mb-6">
                Hackathons are events where students with an interest in STEM come together to collaborate on innovative projects, 
                learn new skills from various workshops, and network with peers in a weekend full of coding and collaboration.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-[#1A1A1E] p-5 rounded-lg border border-gray-800">
                  <div className="text-[#FF2247] mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Team Building</h3>
                  <p className="text-gray-400">Form teams of 1-4 people to tackle challenges together and build innovative solutions.</p>
                </div>
                
                <div className="bg-[#1A1A1E] p-5 rounded-lg border border-gray-800">
                  <div className="text-[#FF2247] mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Learning</h3>
                  <p className="text-gray-400">Attend workshops and talks from industry experts to expand your skills and knowledge.</p>
                </div>
                
                <div className="bg-[#1A1A1E] p-5 rounded-lg border border-gray-800">
                  <div className="text-[#FF2247] mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Rewards</h3>
                  <p className="text-gray-400">Compete for over $3,000 in prizes while building your portfolio and making connections.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}