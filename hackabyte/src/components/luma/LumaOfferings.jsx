/**
 * LUMA Offerings Component
 * 
 * Displays the coding courses and educational programs offered by LUMA:
 * - Grid layout of course cards with distinctive icons and descriptions
 * - Visual differentiation with LUMA's green branding (different from main Hackabyte red)
 * - Content organized by skill level (beginner, intermediate, advanced)
 * - Interactive hover effects for visual engagement
 * - Responsive layout that adapts to different screen sizes
 * - Scroll-triggered animations for visual interest when browsing
 */

'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from '../shared/Container';

export default function LumaOfferings() {
  // Reference for scroll-triggered animations
  const ref = useRef(null);
  // Detect when section enters viewport (20% visibility triggers animation)
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  /**
   * Course offerings data structure
   * Contains course information organized by topics and skill levels
   */
  const offerings = [
    {
      title: "HTML & CSS Basics",
      description: "Learn the fundamentals of web development with HTML and CSS, creating your first web pages and styling them beautifully.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
        </svg>
      )
    },
    {
      title: "JavaScript Fundamentals",
      description: "Dive into programming with JavaScript, learning core concepts like variables, functions, and interactive web elements.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
        </svg>
      )
    },
    {
      title: "Python Programming",
      description: "Explore Python programming through interactive lessons covering data structures, algorithms, and practical applications.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
        </svg>
      )
    },
    {
      title: "Beginner Courses",
      description: "Start from zero with our beginner-friendly courses designed to build a solid foundation in programming concepts.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
        </svg>
      )
    },
    {
      title: "Intermediate Classes",
      description: "Build on your coding knowledge with more complex concepts and project-based learning experiences.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
        </svg>
      )
    },
    {
      title: "Advanced Development",
      description: "Master complex programming concepts and build full applications with our advanced curriculum.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181" />
        </svg>
      )
    },
  ];

  return (
    <section className="py-20 bg-[#1A1A1E]" ref={ref}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#BADA55]">
            What Do We Offer?
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Luma provides a range of coding courses that cater to different ages and skill levels, from beginner to advanced.
            Our interactive and engaging syllabus touches on various aspects from HTML basics to Python programming.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offerings.map((offering, index) => (
            <motion.div
              key={offering.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-[#16161A] rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-800 hover:border-[#BADA55]/30"
            >
              <div className="text-[#BADA55] mb-4">
                {offering.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">{offering.title}</h3>
              <p className="text-gray-400">{offering.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
