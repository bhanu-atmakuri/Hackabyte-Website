/**
 * Join Us Hero Component
 * 
 * Hero section for the Join Us page featuring:
 * - Main headline and mission statement
 * - Interactive cards for different involvement opportunities
 *   (mentoring, volunteering, sponsorship)
 * - Staggered animations for visual engagement
 * - Responsive layout that adapts to screen size
 * - Anchor links to specific sections further down the page
 */

'use client';

import { motion } from 'framer-motion';
import Container from '@/components/shared/Container';

export default function JoinUsHero() {
  return (
    <section className="relative pt-16 md:pt-32 pb-20 bg-[#1A1A1E] flex items-center">
      {/* Decorative background blur elements */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#F93236] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-[#FF2247] rounded-full blur-3xl"></div>
      </div>
      
      <Container>
        <div className="text-center">
          {/* Main content with fade-in and slide-up animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#FF2247] mb-6">
              Join Us
            </h1>
            
            <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
              Become part of our mission to inspire the next generation of innovators and empower young minds through coding challenges and collaboration.
            </p>
            
            {/* Involvement options cards - 3-column grid on larger screens */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              
              {/* Mentor option card with icon and description */}
              <motion.a 
                href="#mentor"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col items-center p-6 bg-[#16161A] rounded-xl border border-gray-800 hover:border-[#FF2247]/30 transition-all"
              >
                <div className="text-[#FF2247] mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">Mentor</h3>
                <p className="text-gray-400 text-sm text-center">Share your knowledge and guide students</p>
              </motion.a>
              
              {/* Volunteer option card with icon and description */}
              <motion.a 
                href="#volunteer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col items-center p-6 bg-[#16161A] rounded-xl border border-gray-800 hover:border-[#FF2247]/30 transition-all"
              >
                <div className="text-[#FF2247] mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 11V9a2 2 0 00-2-2m2 4v4a2 2 0 104 0v-1m-4-3H9m2 0h4m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">Volunteer</h3>
                <p className="text-gray-400 text-sm text-center">Help run our events and support students</p>
              </motion.a>

              {
              /* Commented out "Join Team" option - preserved for future implementation
              <motion.a 
                href="#join-team"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col items-center p-6 bg-[#16161A] rounded-xl border border-gray-800 hover:border-[#FF2247]/30 transition-all"
              >
                <div className="text-[#FF2247] mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">Join Our Team</h3>
                <p className="text-gray-400 text-sm text-center">Explore career opportunities with us</p>
              </motion.a>
              */
              }

              {/* Sponsor option card with icon and description */}
              <motion.a 
                href="#sponsor"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-col items-center p-6 bg-[#16161A] rounded-xl border border-gray-800 hover:border-[#FF2247]/30 transition-all"
              >
                <div className="text-[#FF2247] mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">Sponsor</h3>
                <p className="text-gray-400 text-sm text-center">Support our mission with financial resources</p>
              </motion.a>
            </div>
            
            {/* Closing statement with delayed animation */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-12 max-w-3xl mx-auto text-lg text-gray-300"
            >
              By contributing your time, expertise, or resources, you'll help build a more inclusive 
              and diverse tech community while inspiring the next generation of innovators.
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
