/**
 * Volunteer Opportunities Component
 * 
 * Displays available volunteer positions for Hackabyte events with:
 * - Detailed role descriptions with requirements and time commitments
 * - Benefits of volunteering highlighted in a visually distinct section
 * - Interactive application button with hover animation
 * - Responsive grid layout that adapts to different screen sizes
 * - Visually appealing cards with hover effects for each role
 * - Scroll-triggered animations for visual engagement
 */

'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import Container from '@/components/shared/Container';

export default function VolunteerOpportunities() {
  // Reference for scroll-triggered animations
  const ref = useRef(null);
  // Detect when section enters viewport (20% visibility triggers animation)
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  /**
   * Volunteer roles data structure
   * Each role includes title, description, time commitment, and requirements
   */
  const volunteerRoles = [
    {
      title: "Event Staff",
      description: "Help with event logistics, registration, setup, and breakdown. Welcome participants, distribute materials, and ensure a smooth experience for all attendees.",
      commitment: "1-2 days per event",
      requirements: "Enthusiasm, reliability, good communication skills"
    },
    {
      title: "Workshop Assistant",
      description: "Support instructors during workshops, helping students with questions and troubleshooting technical issues. A great role for those with some coding knowledge.",
      commitment: "4-8 hours per event",
      requirements: "Basic coding knowledge, patience, good communication skills"
    },
    {
      title: "Judge",
      description: "Evaluate student projects based on innovation, technical complexity, design, and presentation. Provide constructive feedback to help students grow.",
      commitment: "6-8 hours (final day of event)",
      requirements: "Technical background, experience in technology or education"
    },
    {
      title: "Technical Support",
      description: "Provide technical assistance to participants, helping them troubleshoot issues with their code, development environments, or hardware.",
      commitment: "Flexible shifts during events",
      requirements: "Strong technical skills, problem-solving ability"
    }
  ];

  return (
    <section id="volunteer" className="py-20 bg-[#16161A]" ref={ref}>
      <Container>
        {/* Section heading with fade-in and slide-up animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#FF2247]">
            Volunteer Opportunities
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Make a difference in students' lives by volunteering at our hackathons and events. No matter your skill level, there's a role for you!
          </p>
        </motion.div>

        {/* Volunteer roles grid with card for each position */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {volunteerRoles.map((role, index) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-[#1A1A1E] p-8 rounded-xl border border-gray-800 hover:border-[#FF2247]/30 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-white mb-4">{role.title}</h3>
              <p className="text-gray-300 mb-6">{role.description}</p>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FF2247]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-400 font-medium">Time Commitment</p>
                    <p className="text-gray-300">{role.commitment}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FF2247]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-400 font-medium">Requirements</p>
                    <p className="text-gray-300">{role.requirements}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Benefits of volunteering section with animated entrance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-[#1A1A1E] p-8 rounded-xl border border-gray-800 max-w-3xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-white mb-4 text-center">Benefits of Volunteering</h3>
          
          {/* Benefits grid with checkmark icons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <svg className="h-5 w-5 text-[#FF2247]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-gray-300">Make meaningful connections with students and professionals</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <svg className="h-5 w-5 text-[#FF2247]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-gray-300">Develop leadership and communication skills</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <svg className="h-5 w-5 text-[#FF2247]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-gray-300">Learn about the latest technologies and trends</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <svg className="h-5 w-5 text-[#FF2247]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-gray-300">Be part of inspiring the next generation of innovators</p>
              </div>
            </div>
          </div>
          
          {/* CTA button with hover animation */}
          <div className="text-center mt-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/contact?subject=Volunteer Application" className="btn-primary inline-block">
                Apply to Volunteer
              </Link>
            </motion.div>
            
            <p className="mt-4 text-gray-300">
              Join our <a href="https://discord.gg/drXX4sZmbX" target="_blank" rel="noopener noreferrer" className="text-[#FF2247] hover:underline">Discord community</a> to connect with other volunteers and stay updated on opportunities!
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
