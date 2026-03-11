'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import Container from '@/components/shared/Container';

export default function VolunteerOpportunities() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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

  const benefits = [
    "Make meaningful connections with students and professionals",
    "Develop leadership and communication skills",
    "Learn about the latest technologies and trends",
    "Be part of inspiring the next generation of innovators"
  ];

  return (
    <section id="volunteer" className="py-24 md:py-32 bg-[#0E0E11] relative" ref={ref}>
      <div className="absolute inset-0 bg-dots opacity-20 pointer-events-none"></div>
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="label-uppercase mb-4 block">Give Back</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
            Volunteer <span className="heading-gradient">Opportunities</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Make a difference in students' lives by volunteering at our hackathons and events. No matter your skill level, there's a role for you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
          {volunteerRoles.map((role, index) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="card-glass rounded-xl p-8 group hover:border-white/[0.12] transition-all duration-300"
            >
              <h3 className="text-xl font-black tracking-tight text-white mb-3">{role.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">{role.description}</p>

              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5 w-5 h-5 flex items-center justify-center bg-[#F93236]/10 border border-[#F93236]/20 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[#FF2247]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-0.5">Time Commitment</p>
                    <p className="text-gray-400 text-sm">{role.commitment}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5 w-5 h-5 flex items-center justify-center bg-[#F93236]/10 border border-[#F93236]/20 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[#FF2247]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-0.5">Requirements</p>
                    <p className="text-gray-400 text-sm">{role.requirements}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="card-gradient-border rounded-xl p-8 max-w-3xl mx-auto"
        >
          <h3 className="text-xl font-black tracking-tight text-white mb-6 text-center">Benefits of Volunteering</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 mt-1 w-5 h-5 flex items-center justify-center bg-[#F93236]/10 border border-[#F93236]/20 rounded">
                  <svg className="h-3 w-3 text-[#FF2247]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-gray-400 text-sm">{benefit}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/contact?subject=Volunteer Application" className="btn-primary inline-block">
              Apply to Volunteer
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
