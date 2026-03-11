'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from '@/components/shared/Container';

export default function HackathonPrizes() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const prizes = [
    {
      place: "FIRST PLACE",
      amount: "$250",
      description: "Highest scored project receives a grand total of",
      color: "#F93236",
      glow: true
    },
    {
      place: "SECOND PLACE",
      amount: "$175",
      description: "Second highest scored project receives a grand total of",
      color: "#FF2247",
      glow: false
    },
    {
      place: "THIRD PLACE",
      amount: "$100",
      description: "Third highest scored project receives a grand total of",
      color: "#FF003C",
      glow: false
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-[#0E0E11] relative" ref={ref}>
      <div className="absolute inset-0 bg-dots opacity-20 pointer-events-none"></div>
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="label-uppercase mb-4 block">Rewards</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
            <span className="heading-gradient">Prizes</span>
          </h2>
          <p className="text-xl font-black tracking-tight text-white">
            MORE THAN $3000 IN PRIZES!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {prizes.map((prize, index) => (
            <motion.div
              key={prize.place}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className={`relative group ${prize.glow ? 'glow-red' : ''}`}
            >
              <div className="card-glass rounded-xl overflow-hidden border-2 transition-all duration-300 hover:scale-[1.03]"
                   style={{ borderColor: `${prize.color}40` }}>
                <div className="p-8 flex flex-col items-center justify-center text-center">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
                       style={{ backgroundColor: `${prize.color}15`, border: `1px solid ${prize.color}30` }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke={prize.color}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-black tracking-tight text-white mb-2">{prize.place}</h3>
                  <p className="text-gray-500 text-sm mb-4">{prize.description}</p>
                  <div className="text-5xl font-black tracking-tight heading-gradient">{prize.amount}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 card-gradient-border rounded-xl p-8 text-center max-w-3xl mx-auto"
        >
          <p className="text-lg text-gray-300 font-bold">
            There is a $75 prize for 3 runner-ups and $50 for honorable mentions, awarded to 6 teams, along with additional awards from sponsors!
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
