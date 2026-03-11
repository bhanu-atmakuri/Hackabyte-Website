'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from '@/components/shared/Container';

export default function AgeGroups() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const ageGroups = [
    {
      title: "High School",
      ageRange: "Ages 14-18",
      description: "Advanced challenges focused on creating full applications with complex functionalities. Work with real APIs, databases, and modern frameworks.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
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
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      ),
      color: "from-[#FF2247] to-[#FF003C]",
      textColor: "text-[#FF2247]"
    },
    {
      title: "College",
      ageRange: "Ages 18-22",
      description: "Expert-level challenges for university students focused on cutting-edge technology, innovation, and industry-ready solutions.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
        </svg>
      ),
      color: "from-[#F93236] to-[#FF003C]",
      textColor: "text-[#FF003C]"
    }
  ];

  return (
    <section className="py-24 md:py-32 lg:py-40 bg-[#0A0A0C] relative" id="age-groups" ref={ref}>
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20 px-4 sm:px-0"
        >
          <span className="label-uppercase mb-4 block">Age Groups</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
            Challenges for <span className="heading-gradient">All Ages</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto">
            We tailor hackathon challenges to different age groups, ensuring that all students
            can participate and grow at an appropriate level.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
          {ageGroups.map((group, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="group"
            >
              <div className="relative card-gradient-border rounded-xl h-full transform group-hover:-translate-y-2 transition-all duration-300">
                {/* Left vertical accent stripe */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${group.color} rounded-l-xl`}></div>

                <div className="p-6 md:p-8 pl-8 md:pl-10">
                  {/* Icon in large circle bg */}
                  <div className={`w-16 h-16 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center ${group.textColor} mb-6`}>
                    {group.icon}
                  </div>

                  <h3 className="text-2xl font-black tracking-tight text-white mb-2">{group.title}</h3>

                  {/* Age range as pill badge */}
                  <span className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider ${group.textColor} bg-white/[0.03] border border-white/[0.06] rounded-full mb-4`}>
                    {group.ageRange}
                  </span>

                  <p className="text-gray-500 leading-relaxed">{group.description}</p>

                  <motion.div
                    className="mt-6 inline-block"
                    whileHover={{ x: 4 }}
                  >
                    <a
                      href="/events#upcoming"
                      className={`${group.textColor} font-bold text-sm uppercase tracking-wider flex items-center`}
                    >
                      See Events
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </a>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
