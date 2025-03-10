'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from '@/components/shared/Container';

export default function HackathonInfo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const infoSections = [
    {
      title: "Duration & Logistics",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      content: "Our hackathons are two-day events, starting from the morning of one day to the evening of the next. Food and drinks will be provided."
    },
    {
      title: "Team Formation",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      content: "Team size can be anywhere between 1-4 people, where every member must be within the age requirements of the event. You can sign up as a full team, sign up individually and be added to a random team, or sign up as a partial team and get matched with others."
    },
    {
      title: "What to Bring",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m8 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      content: "All you're going to need to bring are a laptop and a charger, along with any other items that could be useful for your project. Food, water, and snacks will be provided for you, so you don't have to worry about that. Drinks can be purchased at vending machines at the center."
    },
    {
      title: "Theme & Projects",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      content: "During the opening ceremony, a theme will be introduced to all participants. All groups must create a project that solves a problem related to the theme. More information about this will be provided during the hackathon."
    },
    {
      title: "Workshops",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      content: "During the competition period, there will be a multitude of educational workshops, talks from industry experts, and other fun games. Despite this being optional, participants are encouraged to attend and take advantage of all resources given to them. Some workshops may be very useful for your final submission."
    },
    {
      title: "Submissions & Presentations",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      content: "All submissions will be made online on Devpost, where groups can add written descriptions, images, videos, and any other info about their project. After submissions, participants will create a small, 3 to 5-minute presentation showcasing their projects to the judges in a science fair-type format. The 6 finalists will then be chosen to present a longer and more in-depth explanation of their project."
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-20 bg-[#16161A]" ref={ref}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#FF2247]">
            Key Information
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Everything you need to know about participating in our hackathons
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {infoSections.map((section, index) => (
            <motion.div
              key={section.title}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: index * 0.1 }}
              className="bg-[#1A1A1E] p-6 rounded-xl border border-gray-800 hover:border-[#FF2247]/30 transition-all duration-300"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 text-[#FF2247] mr-4">
                  {section.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">{section.title}</h3>
                  <p className="text-gray-300">{section.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 bg-[#1A1A1E] p-8 rounded-xl border border-gray-800"
        >
          <h3 className="text-2xl font-bold text-white mb-4">Judging & Scoring</h3>
          <p className="text-gray-300">
            After all groups have presented in the first round, judges will rank groups from a set of criteria (will be given during event). 
            After 6 finalists are chosen, the process will be repeated but will be more subjective (dependent on what the judges think about the projects). 
            The teams with the highest scores will be given prizes. More information about this will be provided during the hackathon.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
