'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function AgeGroups() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const ageGroups = [
    {
      title: "High School",
      ageRange: "Ages 14-18",
      description: "Advanced challenges focused on creating full applications with complex functionalities. Work with real APIs, databases, and modern frameworks.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
        </svg>
      ),
      color: "from-[#F93236] to-[#FF003C]",
      textColor: "text-[#F93236]"
    },
    {
      title: "Middle School",
      ageRange: "Ages 11-13",
      description: "Intermediate challenges that introduce more complex concepts like data structures, algorithms, and simple web applications.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      ),
      color: "from-[#FF2247] to-[#FF003C]",
      textColor: "text-[#FF2247]"
    },
    {
      title: "Elementary School",
      ageRange: "Ages 7-10",
      description: "Fun, gamified challenges designed to introduce basic programming concepts in a visual, interactive way.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        </svg>
      ),
      color: "from-[#333333] to-[#444444]",
      textColor: "text-[#FF003C]"
    }
  ];

  return (
    <section className="py-20 bg-[#1A1A1E]" id="age-groups" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#FF2247]">
            Challenges for All Ages
          </h2>
          <div className="text-xl text-gray-300 max-w-3xl mx-auto">
            We tailor hackathon challenges to different age groups, ensuring that all students 
            can participate and grow at an appropriate level.
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ageGroups.map((group, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="group"
            >
              <div className="relative bg-[#16161A] rounded-xl shadow-lg overflow-hidden h-full transform group-hover:-translate-y-2 transition-all duration-300 border border-gray-800 hover:border-[#F93236]/30">
                {/* Gradient Top Border */}
                <div className={`h-2 w-full bg-gradient-to-r ${group.color}`}></div>
                
                <div className="p-8">
                  <div className={`${group.textColor} mb-6`}>
                    {group.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2 text-white">{group.title}</h3>
                  <p className="text-gray-400 mb-4">{group.ageRange}</p>
                  <p className="text-gray-300">{group.description}</p>
                  
                  <motion.div 
                    className="mt-6 inline-block"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <a 
                      href="#" 
                      className={`${group.textColor} font-medium flex items-center`}
                    >
                      Learn more
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </a>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}