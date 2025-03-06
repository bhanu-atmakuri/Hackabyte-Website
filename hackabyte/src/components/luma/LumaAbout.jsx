'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function LumaAbout() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="py-20 bg-[#16161A]" id="about" ref={ref}>
      <div className="container-custom max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#FF2247]">
            About Us
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#1A1A1E] p-8 rounded-xl border border-gray-800"
          >
            <h3 className="text-2xl font-bold text-[#FF2247] mb-4">Our Story</h3>
            <p className="text-gray-300 mb-4">
              In 2024, Jash and Ekansh, the co-founders of Luma, established the organization to allow young minds 
              to learn coding, irrespective of their skill level. The initiative branched out from Hackabyte 
              with a focused mission on inclusive software education.
            </p>
            <p className="text-gray-300 mb-4">
              Our aim is to empower every student to overcome limitations through engaging coding classes 
              that are creative, problem-solving, and innovative.
            </p>
            <p className="text-gray-300">
              We believe that every child should be educated in basic coding skills irrespective of their 
              socio-economic background or experience in the field.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-[#1A1A1E] p-8 rounded-xl border border-gray-800"
          >
            <h3 className="text-2xl font-bold text-[#FF2247] mb-4">Our Vision</h3>
            <p className="text-gray-300 mb-4">
              LUMA envisions a world where every young person, regardless of background, has access to quality 
              coding education that empowers them to shape the digital future.
            </p>
            <p className="text-gray-300 mb-4">
              We strive to create an inclusive learning environment where students can develop not only 
              technical skills but also creative thinking, problem-solving abilities, and collaborative mindsets.
            </p>
            <p className="text-gray-300">
              Through our commitment to accessible education, we aim to bridge the digital divide and prepare 
              the next generation of diverse, skilled, and innovative tech leaders.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}