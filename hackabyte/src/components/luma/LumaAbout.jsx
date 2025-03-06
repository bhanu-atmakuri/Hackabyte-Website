'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function LumaAbout() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="py-20 bg-[#16161A]" id="about" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#BADA55]">
            About Us
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[#1A1A1E] p-8 rounded-xl border border-gray-800 max-w-4xl mx-auto"
        >
          <p className="text-gray-300 mb-6">
            In 2024, Jash and Ekansh, the co-founders of Luma, established the Luma organization to allow young minds to learn coding, irrespective of their skill level. Our aim is to empower every student to overcome limitations through engaging coding classes. Classes that are creative, problem-solving as well as innovative.
          </p>
          <p className="text-gray-300">
            We believe that every child should be educated in basic coding skills irrespective of his or her socio-economic background or experience in the field.
          </p>
        </motion.div>
      </div>
    </section>
  );
}