'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import Container from '@/components/shared/Container';

export default function MentorProgram() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  const mentorResponsibilities = [
    "Provide technical guidance to teams struggling with coding challenges",
    "Help students refine project ideas and scope them appropriately",
    "Offer encouragement and motivation during challenging moments",
    "Share best practices and industry insights with students",
    "Provide feedback on project presentations and demonstrations"
  ];

  const mentorAreas = [
    { area: "Web Development", description: "Guide students in building responsive websites and web applications using HTML, CSS, JavaScript and modern frameworks." },
    { area: "Mobile App Development", description: "Help teams create native or cross-platform mobile applications for iOS and Android devices." },
    { area: "Game Development", description: "Support students in building games using engines like Unity or JavaScript libraries, focusing on game mechanics and user experience." },
    { area: "Data Science & AI", description: "Mentor projects involving data analysis, machine learning, or artificial intelligence applications." },
    { area: "Hardware & IoT", description: "Assist with projects that combine software and hardware components using platforms like Arduino or Raspberry Pi." },
    { area: "Cybersecurity", description: "Guide students in understanding digital security principles and implementing secure coding practices." }
  ];

  return (
    <section id="mentor" className="py-24 md:py-32 bg-[#0A0A0C] relative" ref={ref}>
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="label-uppercase mb-4 block">Share Expertise</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
            Mentor <span className="heading-gradient">Program</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Share your expertise and inspire the next generation of tech innovators. Our mentors play a crucial role in guiding students through hackathon challenges.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card-glass rounded-xl p-8 relative overflow-hidden"
          >
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#F93236] to-[#FF2247]"></div>
            <div className="pl-4">
              <h3 className="text-xl font-black tracking-tight text-white mb-4">What Mentors Do</h3>

              <div className="space-y-3 mb-8">
                {mentorResponsibilities.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1 w-5 h-5 flex items-center justify-center bg-[#F93236]/10 border border-[#F93236]/20 rounded">
                      <svg className="h-3 w-3 text-[#FF2247]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-400 text-sm">{item}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-1">Time Commitment</h4>
                  <p className="text-gray-500 text-sm">Mentors typically commit to 4-8 hours during a hackathon, either in person or virtually. You can choose shifts that work with your schedule.</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-1">Requirements</h4>
                  <p className="text-gray-500 text-sm">Technical expertise in at least one programming language or technology area, good communication skills, and patience for working with students of varying skill levels.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xl font-black tracking-tight text-white mb-6">Mentorship Areas</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {mentorAreas.map((item) => (
                <div
                  key={item.area}
                  className="card-glass rounded-xl p-5 hover:border-white/[0.12] transition-all"
                >
                  <h4 className="text-sm font-bold text-[#FF2247] uppercase tracking-wider mb-2">{item.area}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 card-glass rounded-xl p-5">
              <h4 className="text-base font-bold tracking-tight text-white mb-2">Don't see your area of expertise?</h4>
              <p className="text-gray-500 text-sm leading-relaxed">We welcome mentors from all technical backgrounds. If your skills aren't listed here, please still apply - diverse perspectives and knowledge areas are valuable to our students!</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <h3 className="text-2xl font-black tracking-tight text-white mb-4">Ready to Share Your Knowledge?</h3>
          <p className="text-gray-500 max-w-2xl mx-auto mb-8 leading-relaxed">
            Join our community of mentors and make a lasting impact on students' learning journeys.
            Many of our mentors find the experience rewarding and continue to participate in multiple events.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact?subject=Mentor Application" className="btn-primary inline-block">
              Apply as a Mentor
            </Link>
            <Link href="/contact" className="btn-secondary inline-block">
              Contact Us
            </Link>
          </div>

          <div className="mt-12 card-gradient-border rounded-xl p-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-white/[0.03] border border-white/[0.06] flex-shrink-0 overflow-hidden">
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
                <p className="text-gray-400 italic leading-relaxed">
                  "Being a mentor at Hackabyte's events has been incredibly rewarding. Watching students grow from uncertain beginners to confident developers over just a weekend is amazing. The energy and fresh ideas these young minds bring is inspiring!"
                </p>
                <p className="text-[#FF2247] font-bold text-sm mt-4">
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
