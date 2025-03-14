/**
 * Join Team Component
 * 
 * Careers section displaying open positions and company benefits with:
 * - Job listings with detailed descriptions and requirements
 * - Organization values and benefits for prospective employees
 * - Visual appeal through images and styled cards
 * - Interactive application buttons with hover effects
 * - Responsive layout that adapts to different screen sizes
 * - Scroll-triggered animations for visual engagement
 */

'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import Container from '@/components/shared/Container';

export default function JoinTeam() {
  // Reference for scroll-triggered animations
  const ref = useRef(null);
  // Detect when section enters viewport (20% visibility triggers animation)
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  /**
   * Open positions data structure
   * Each position includes title, type, location, description, and requirements
   */
  const openPositions = [
    {
      title: "Event Coordinator",
      type: "Full-time",
      location: "San Francisco, CA or Remote",
      description: "Plan and execute hackathon events, managing logistics, venue coordination, and event timelines. Work closely with schools and venue partners to ensure successful events.",
      requirements: [
        "2+ years experience in event planning or coordination",
        "Strong organizational and communication skills",
        "Experience working with educational institutions preferred",
        "Ability to travel to event locations when necessary"
      ]
    },
    {
      title: "Curriculum Developer",
      type: "Part-time",
      location: "Remote",
      description: "Create age-appropriate coding challenges, workshops, and learning materials for our hackathon participants ranging from elementary to high school levels.",
      requirements: [
        "Background in computer science or related field",
        "Experience developing educational content",
        "Understanding of different age group learning capabilities",
        "Familiarity with various programming languages and technologies"
      ]
    },
    {
      title: "Community Outreach Specialist",
      type: "Full-time",
      location: "Multiple Locations",
      description: "Develop relationships with schools, community organizations, and technology partners to expand Hackabyte's reach and impact, with a focus on underrepresented communities.",
      requirements: [
        "Strong networking and relationship-building skills",
        "Experience in education, nonprofits, or community organizing",
        "Passion for increasing diversity in technology",
        "Excellent verbal and written communication abilities"
      ]
    }
  ];

  return (
    <section id="careers" className="py-20 bg-[#16161A]" ref={ref}>
      <Container>
        {/* Section heading with fade-in and slide-up animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#FF2247]">
            Join Our Team
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Become part of a mission-driven organization dedicated to empowering the next generation of technology innovators and problem-solvers.
          </p>
        </motion.div>

        {/* Two-column layout for benefits and values */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Left column - "Why Work With Us" with slide-in animation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#1A1A1E] p-8 rounded-xl border border-gray-800"
          >
            <h3 className="text-2xl font-bold text-[#FF2247] mb-6">Why Work With Us?</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Make an Impact</h4>
                <p className="text-gray-300">
                  Work that directly contributes to increasing coding literacy and technology skills among young students across diverse backgrounds.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Collaborative Culture</h4>
                <p className="text-gray-300">
                  Join a team of passionate educators, technologists, and community builders who value collaboration, innovation, and inclusivity.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Growth Opportunities</h4>
                <p className="text-gray-300">
                  Develop your professional skills while working on meaningful projects in a fast-growing organization.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Flexible Work</h4>
                <p className="text-gray-300">
                  We offer remote work options and flexible schedules for many positions to support work-life balance.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Competitive Benefits</h4>
                <p className="text-gray-300">
                  Full-time positions include health insurance, professional development stipends, paid time off, and other competitive benefits.
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Right column - Image and company values with sticky positioning */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="sticky top-24">
              <div
                className="h-80 rounded-xl overflow-hidden relative mb-6"
                style={{
                  backgroundImage: 'url(/api/placeholder/600/400)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#16161A] to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Join Our Mission</h3>
                  <p className="text-gray-300">
                    Our team members share a passion for education, technology, and creating opportunities for young people.
                  </p>
                </div>
              </div>
              
              <div className="bg-[#1A1A1E] p-6 rounded-xl border border-gray-800">
                <h4 className="text-lg font-bold text-white mb-3">Our Values</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#FF2247]"></div>
                    <p className="text-gray-300">Inclusivity & Diversity</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#FF2247]"></div>
                    <p className="text-gray-300">Innovation & Creativity</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#FF2247]"></div>
                    <p className="text-gray-300">Continuous Learning</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#FF2247]"></div>
                    <p className="text-gray-300">Collaborative Problem-Solving</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#FF2247]"></div>
                    <p className="text-gray-300">Community Impact</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Open positions section with staggered card animations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Open Positions</h3>
          
          {/* Job listings with individual fade-in animations */}
          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <motion.div
                key={position.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                className="bg-[#1A1A1E] rounded-xl border border-gray-800 overflow-hidden"
              >
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
                    <div>
                      <h4 className="text-xl font-bold text-white">{position.title}</h4>
                      <div className="flex flex-wrap items-center gap-3 mt-2">
                        <span className="text-sm bg-[#FF2247]/20 text-[#FF2247] px-3 py-1 rounded-full">
                          {position.type}
                        </span>
                        <span className="text-sm text-gray-400">
                          {position.location}
                        </span>
                      </div>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="md:flex-shrink-0"
                    >
                      <Link href="/contact?subject=Job Application" className="btn-primary block text-center whitespace-nowrap">
                        Apply Now
                      </Link>
                    </motion.div>
                  </div>
                  
                  <p className="text-gray-300 mb-6">
                    {position.description}
                  </p>
                  
                  <div>
                    <h5 className="text-white font-semibold mb-2">Requirements:</h5>
                    <ul className="list-disc pl-5 space-y-1 text-gray-300">
                      {position.requirements.map((req, idx) => (
                        <li key={idx}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* General application section for positions not listed */}
          <div className="mt-12 text-center">
            <h4 className="text-xl font-bold text-white mb-3">Don't see a position that fits your skills?</h4>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              We're always looking for talented individuals who are passionate about our mission. 
              Send us your resume and tell us how you can contribute to Hackabyte.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link href="/contact" className="btn-secondary inline-block px-8 py-3">
                Submit General Application
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
