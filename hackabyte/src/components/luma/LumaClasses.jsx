'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

export default function LumaClasses() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const classes = [
    {
      title: "Web Development Fundamentals",
      level: "Beginner",
      ageRange: "Ages 10-13",
      description: "Introduction to HTML, CSS, and basic JavaScript to create simple and interactive websites.",
      includes: ["HTML structure and elements", "CSS styling and layouts", "Basic JavaScript concepts", "Small web project development"],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      title: "Python Programming",
      level: "Intermediate",
      ageRange: "Ages 12-15",
      description: "Explore Python programming language fundamentals with practical projects and problem-solving exercises.",
      includes: ["Python syntax and data types", "Control structures and functions", "Simple algorithms", "Game development basics"],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Advanced Coding & Projects",
      level: "Advanced",
      ageRange: "Ages 14-18",
      description: "Develop more complex applications and dive deeper into programming concepts with mentor guidance.",
      includes: ["Advanced programming techniques", "Data structures and algorithms", "Full-stack development", "Collaborative group projects"],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-20 bg-[#1A1A1E]" id="classes" ref={ref}>
      <div className="container-custom max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#FF2247]">
            What We Offer
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            LUMA provides a range of coding courses that cater to different ages and skill levels, 
            from beginner to advanced.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {classes.map((course, index) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              className="bg-[#16161A] rounded-xl overflow-hidden border border-gray-800 hover:border-[#FF2247]/30 transition-all duration-300 h-full"
            >
              <div className="p-6">
                <div className="text-[#FF2247] mb-4">
                  {course.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{course.title}</h3>
                <div className="flex space-x-3 mb-3">
                  <span className="text-xs px-2 py-1 bg-[#F93236]/20 text-[#F93236] rounded-full">{course.level}</span>
                  <span className="text-xs px-2 py-1 bg-[#333333] text-gray-300 rounded-full">{course.ageRange}</span>
                </div>
                <p className="text-gray-300 mb-4">{course.description}</p>
                
                <h4 className="text-sm font-semibold text-white mb-2">Course includes:</h4>
                <ul className="text-gray-400 text-sm space-y-1 mb-6">
                  {course.includes.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="h-4 w-4 text-[#FF2247] mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-auto"
                >
                  <Link href="/luma/register" className="btn-primary w-full block text-center">
                    Enroll Now
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}