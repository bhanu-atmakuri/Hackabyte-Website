'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from '@/components/shared/Container';

export default function HackathonRules() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const rules = [
    {
      title: "No Cheating or Plagiarism",
      description: "Copying others' work in any sense will lead to disqualification. Getting help is fine, but completely copying code and submitting others' work as your own is considered cheating."
    },
    {
      title: "Be Respectful",
      description: "Whether it's staff, competitors, or your teammates, everyone's there to collaborate and learn new things. Verbal and physical abuse will not be tolerated."
    },
    {
      title: "Treat Resources with Care",
      description: "The venue is not our own, and therefore must be treated with care. Please do not mess with anything you don't know how to use and request help if truly necessary. Make sure to not leave a mess with any food and drinks provided as well."
    },
    {
      title: "Ask for Help",
      description: "If you have any questions regarding your code, policies, or quite literally anything, please ask! We're trying our best to provide the best experience possible, and our team would be more than happy to help you."
    },
    {
      title: "Have Fun!",
      description: "Hackathons are great opportunities to meet new people, make connections, and enjoy the many cool events laid out for you. Don't let these opportunities go to waste!"
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-[#0A0A0C] relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>
      <div className="absolute inset-0 -z-10 opacity-5">
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#F93236] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-[#FF2247] rounded-full blur-3xl"></div>
      </div>

      <Container size="wide" className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="label-uppercase mb-4 block">Guidelines</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
            Competition <span className="heading-gradient">Rules</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Please review and follow these guidelines to ensure a positive experience for everyone
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical timeline line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-[#F93236] via-[#FF2247] to-transparent"></div>

          <div className="space-y-6">
            {rules.map((rule, index) => (
              <motion.div
                key={rule.title}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="card-glass rounded-xl p-6 ml-12 relative"
              >
                {/* Timeline dot */}
                <div className="absolute -left-[calc(3rem+7px)] top-6 w-3.5 h-3.5 rounded-full bg-gradient-to-r from-[#F93236] to-[#FF2247] ring-4 ring-[#0A0A0C]"></div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gradient-to-r from-[#F93236] to-[#FF2247] rounded-lg mr-4">
                    <span className="text-white text-sm font-black">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-white mb-2">{rule.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{rule.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
