/**
 * Mentor Program Component
 * 
 * Displays information about Hackabyte's mentorship opportunities featuring:
 * - Detailed explanation of mentor responsibilities and time commitment
 * - Various technical areas where mentors can contribute expertise
 * - Application call-to-action and contact options
 * - Testimonial from an existing mentor
 * - Scroll-triggered animations for visual engagement
 * - Responsive grid layouts that adapt to different screen sizes
 */

'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import Container from '@/components/shared/Container';

export default function MentorProgram() {
  // Reference for scroll-triggered animations
  const ref = useRef(null);
  // Detect when section enters viewport (5% visibility triggers animation)
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  /**
   * Mentorship areas data structure
   * Defines technical domains where mentors can contribute expertise
   */
  const mentorAreas = [
    {
      area: "Web Development",
      description: "Guide students in building responsive websites and web applications using HTML, CSS, JavaScript and modern frameworks."
    },
    {
      area: "Mobile App Development",
      description: "Help teams create native or cross-platform mobile applications for iOS and Android devices."
    },
    {
      area: "Game Development",
      description: "Support students in building games using engines like Unity or JavaScript libraries, focusing on game mechanics and user experience."
    },
    {
      area: "Data Science & AI",
      description: "Mentor projects involving data analysis, machine learning, or artificial intelligence applications."
    },
    {
      area: "Hardware & IoT",
      description: "Assist with projects that combine software and hardware components using platforms like Arduino or Raspberry Pi."
    },
    {
      area: "Cybersecurity",
      description: "Guide students in understanding digital security principles and implementing secure coding practices."
    }
  ];

  return (
    <section id="mentor" className="py-20 bg-[#1A1A1E]" ref={ref}>
      <Container>
        {/* Section heading with fade-in and slide-up animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#FF2247]">
            Mentor Program
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Share your expertise and inspire the next generation of tech innovators. Our mentors play a crucial role in guiding students through hackathon challenges.
          </p>
        </motion.div>

        {/* Two-column layout with mentor responsibilities and areas of expertise */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          {/* Left column - "What Mentors Do" card with slide-in animation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#16161A] p-8 rounded-xl border border-gray-800"
          >
            <h3 className="text-2xl font-bold text-[#FF2247] mb-4">What Mentors Do</h3>
            
            {/* Checklist of mentor responsibilities */}
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg className="h-5 w-5 text-[#FF2247]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-gray-300">Provide technical guidance to teams struggling with coding challenges</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg className="h-5 w-5 text-[#FF2247]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-gray-300">Help students refine project ideas and scope them appropriately</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg className="h-5 w-5 text-[#FF2247]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-gray-300">Offer encouragement and motivation during challenging moments</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg className="h-5 w-5 text-[#FF2247]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-gray-300">Share best practices and industry insights with students</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg className="h-5 w-5 text-[#FF2247]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-gray-300">Provide feedback on project presentations and demonstrations</p>
                </div>
              </div>
            </div>
            
            {/* Mentor time commitment and requirements section */}
            <div className="mt-8">
              <h4 className="text-lg font-bold text-white mb-2">Time Commitment:</h4>
              <p className="text-gray-300 mb-6">Mentors typically commit to 4-8 hours during a hackathon, either in person or virtually. You can choose shifts that work with your schedule.</p>
              
              <h4 className="text-lg font-bold text-white mb-2">Requirements:</h4>
              <p className="text-gray-300">Technical expertise in at least one programming language or technology area, good communication skills, and patience for working with students of varying skill levels.</p>
            </div>
          </motion.div>
          
          {/* Right column - "Mentorship Areas" with grid of expertise cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Mentorship Areas</h3>
            
            {/* Expertise areas grid - 2 columns on tablet and larger screens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {mentorAreas.map((item, index) => (
                <div 
                  key={item.area}
                  className="bg-[#16161A] p-6 rounded-xl border border-gray-800 hover:border-[#FF2247]/30 transition-all"
                >
                  <h4 className="text-lg font-bold text-[#FF2247] mb-2">{item.area}</h4>
                  <p className="text-gray-300 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
            
            {/* Additional expertise info card */}
            <div className="mt-8 bg-[#16161A] p-6 rounded-xl border border-gray-800">
              <h4 className="text-lg font-bold text-white mb-2">Don't see your area of expertise?</h4>
              <p className="text-gray-300">We welcome mentors from all technical backgrounds. If your skills aren't listed here, please still apply - diverse perspectives and knowledge areas are valuable to our students!</p>
            </div>
          </motion.div>
        </div>

        {/* Call-to-action section with fade-in and slide-up animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Ready to Share Your Knowledge?</h3>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Join our community of mentors and make a lasting impact on students' learning journeys. 
            Many of our mentors find the experience rewarding and continue to participate in multiple events.
          </p>
          
          {/* CTA buttons with hover animations */}
          <div className="flex flex-wrap justify-center gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/contact?subject=Mentor Application" className="btn-primary block px-8 py-3">
                Apply as a Mentor
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/contact" className="btn-secondary block px-8 py-3">
                Contact Us
              </Link>
            </motion.div>
          </div>
          
          {/* Mentor testimonial quote card */}
          <div className="mt-10 max-w-4xl mx-auto px-6 py-8 bg-[#16161A] rounded-xl border border-gray-800">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gray-800 flex-shrink-0 overflow-hidden">
                <div 
                  className="w-full h-full"
                  style={{
                    backgroundImage: 'url(/api/placeholder/120/120)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                ></div>
              </div>
              <div className="text-left">
                <p className="text-gray-300 italic">
                  "Being a mentor at Hackabyte's events has been incredibly rewarding. Watching students grow from uncertain beginners to confident developers over just a weekend is amazing. The energy and fresh ideas these young minds bring is inspiring!"
                </p>
                <p className="text-[#FF2247] font-semibold mt-4">
                  — Sarah Chen, Software Engineer at TechCorp
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
