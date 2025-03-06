'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

export default function LumaVolunteer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const opportunities = [
    {
      title: "Instructor",
      description: "Share your coding knowledge by teaching classes and workshops to eager young learners.",
      requirements: ["Knowledge in at least one programming language", "Good communication skills", "Commitment of at least 2 hours per week"]
    },
    {
      title: "Mentor",
      description: "Provide one-on-one guidance and support to students as they work on their coding projects.",
      requirements: ["Programming experience", "Patience and supportive attitude", "Flexible schedule for mentoring sessions"]
    },
    {
      title: "Curriculum Developer",
      description: "Help create engaging learning materials and coding exercises for different skill levels.",
      requirements: ["Strong technical knowledge", "Understanding of educational principles", "Creative approach to teaching coding"]
    }
  ];

  return (
    <section className="py-20 bg-[#1A1A1E] relative overflow-hidden" id="volunteer" ref={ref}>
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-[#F93236]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-[#FF2247]/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-custom max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20