'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

export default function LumaJoin() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="py-20 bg-[#1A1A1E] relative overflow-hidden" id="join" ref={ref}>
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#BADA55] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-[#BADA55] rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-custom max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#BADA55]">
            Join us Today!
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#16161A] p-8 rounded-xl border border-gray-800"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Become a Volunteer</h3>
            <p className="text-gray-300 mb-6">
              Luma is looking for volunteers! Apart from being a school that offers training in programming languages, we are a strong community where learners come together with trainers and guides so they can thrive in what they do. Our team of experienced professionals is committed to helping kids reach their full potential academically through teaching; thus fostering an atmosphere that promotes group work among peers.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link href="/contact" className="bg-[#BADA55] hover:bg-[#A5C244] text-black font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105">
                APPLY NOW!
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-[#16161A] p-8 rounded-xl border border-gray-800"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Join Our Community</h3>
            <p className="text-gray-300 mb-6">
              Join Team Luma now and make a difference! Apply today and become a part of our community of passionate individuals who are dedicated to making positive impact. Don't miss out on this opportunity be a part of something.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/register" className="bg-[#BADA55] hover:bg-[#A5C244] text-black font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 block text-center">
                  JOIN!
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a href="https://discord.gg/hackabyte" target="_blank" rel="noopener noreferrer" className="bg-[#333333] hover:bg-[#444444] text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 block text-center">
                  Join our Discord!
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}