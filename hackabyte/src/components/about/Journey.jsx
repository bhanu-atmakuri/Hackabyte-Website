'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Journey() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const milestones = [
    {
      year: "2018",
      title: "Humble Beginnings",
      description: "Hackabyte was founded by a group of passionate computer science educators and tech professionals who recognized the need for more engaging coding education for young students."
    },
    {
      year: "2019",
      title: "First Regional Event",
      description: "We hosted our first large-scale hackathon with over 150 students from 12 different schools, establishing our model of age-appropriate challenges and mentorship."
    },
    {
      year: "2020",
      title: "Virtual Adaptation",
      description: "In response to global challenges, we successfully transitioned to virtual events, reaching even more students and expanding our geographic impact."
    },
    {
      year: "2021",
      title: "Curriculum Development",
      description: "Launched our comprehensive pre-hackathon curriculum to help schools prepare students for events and provide ongoing coding education."
    },
    {
      year: "2022",
      title: "Industry Partnerships",
      description: "Formed key partnerships with tech companies to provide mentors, resources, and pathways to internships for our high school participants."
    },
    {
      year: "2023",
      title: "National Expansion",
      description: "Expanded to multiple cities across the country, bringing our hackathons to thousands of new students in previously underserved areas."
    },
    {
      year: "2024",
      title: "LUMA Program Launch",
      description: "Introduced our Leadership, Unity, Mentorship, and Achievement (LUMA) program to develop student leaders and create sustainable coding communities."
    }
  ];

  return (
    <section className="py-20 bg-[#1A1A1E]" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#FF2247]">
            Our Journey
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            From a small local initiative to a nationwide movement, see how Hackabyte has evolved 
            while staying true to our mission of empowering young coders.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-800"></div>

          {/* Timeline Items */}
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className={`relative z-10 mb-12 flex items-center ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              {/* Year Circle */}
              <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#FF2247] flex items-center justify-center">
                  <span className="text-white font-bold">{milestone.year}</span>
                </div>
              </div>

              {/* Content */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'pr-10 text-right' : 'pl-10 text-left'}`}>
                <div className="bg-[#16161A] p-6 rounded-lg border border-gray-800 hover:border-[#FF2247]/30 transition-all duration-300">
                  <h3 className="text-xl font-bold text-[#FF2247] mb-2">{milestone.title}</h3>
                  <p className="text-gray-300">{milestone.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}