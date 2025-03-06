'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function LumaOffers() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="py-20 bg-[#1A1A1E]" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#BADA55]">
            What Do We Offer?
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[#16161A] p-8 rounded-xl border border-gray-800 max-w-4xl mx-auto"
        >
          <p className="text-gray-300 mb-6">
            Luma provides a range of coding courses, that cater to different ages and skill levels ranging from beginner levels to more advanced levels. Our interactive and engaging syllabus touches on various aspects from HTML basics, all the way to Python programming languages, which enables students to express themselves freely.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-[#1A1A1E] p-5 rounded-lg border border-gray-800">
              <div className="text-[#BADA55] mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Beginner Courses</h3>
              <p className="text-gray-400 text-sm">Introduction to programming concepts with block-based coding and HTML/CSS fundamentals.</p>
            </div>

            <div className="bg-[#1A1A1E] p-5 rounded-lg border border-gray-800">
              <div className="text-[#BADA55] mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Intermediate Learning</h3>
              <p className="text-gray-400 text-sm">JavaScript fundamentals and introduction to programming logic with Python basics.</p>
            </div>

            <div className="bg-[#1A1A1E] p-5 rounded-lg border border-gray-800">
              <div className="text-[#BADA55] mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Advanced Projects</h3>
              <p className="text-gray-400 text-sm">Build complex applications with Python, web development frameworks, and introduction to data science.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}