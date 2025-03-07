'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';

export default function JoinTeam() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const teamRoles = [
    {
      title: "Operations Coordinator",
      description: "Manage event logistics, coordinate with venues, and ensure smooth execution of hackathon events.",
      skills: ["Project Management", "Communication", "Problem-Solving"]
    },
    {
      title: "Marketing & Communications Specialist",
      description: "Develop marketing strategies, manage social media, and create promotional content to attract participants and sponsors.",
      skills: ["Digital Marketing", "Graphic Design", "Social Media Management"]
    },
    {
      title: "Community Outreach Coordinator",
      description: "Build partnerships with schools, universities, and tech communities to expand our reach and impact.",
      skills: ["Networking", "Relationship Building", "Public Speaking"]
    },
    {
      title: "Technology & Web Development",
      description: "Develop and maintain our website, registration platforms, and digital infrastructure.",
      skills: ["Web Development", "UI/UX Design", "Full-Stack Programming"]
    },
    {
      title: "Sponsorship & Partnerships Manager",
      description: "Identify, engage, and manage relationships with potential corporate and educational sponsors.",
      skills: ["Business Development", "Negotiation", "Relationship Management"]
    },
    {
      title: "Workshop & Content Curator",
      description: "Design and coordinate educational content, workshops, and learning experiences for hackathon participants.",
      skills: ["Curriculum Design", "Technical Writing", "Educational Strategy"]
    }
  ];

  return (
    <section id="join-team" className="py-20 bg-[#1A1A1E]" ref={ref}>
      <div className="container-custom">
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
            Be part of a passionate team dedicated to empowering the next generation of tech innovators. 
            We're always looking for talented individuals who want to make a difference.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamRoles.map((role, index) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-[#16161A] p-6 rounded-xl border border-gray-800 hover:border-[#FF2247]/30 transition-all"
            >
              <div className="text-[#FF2247] mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{role.title}</h3>
              <p className="text-gray-300 mb-4">{role.description}</p>
              
              <div className="mt-4">
                <h4 className="text-md font-semibold text-[#FF2247] mb-2">Key Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {role.skills.map((skill) => (
                    <span 
                      key={skill} 
                      className="px-2 py-1 text-xs bg-[#1A1A1E] text-gray-300 rounded-full border border-gray-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Ready to Make an Impact?</h3>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            We believe in creating opportunities for passionate individuals to grow and contribute. 
            If you don't see a role that fits perfectly, we're always open to hearing from talented people.
          </p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="/team-application" 
              className="btn-primary inline-block px-8 py-3"
            >
              Apply to Join Our Team
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}