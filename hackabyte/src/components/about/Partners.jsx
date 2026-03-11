'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from '../shared/Container';
import { PLACEHOLDER_IMAGES, resolveImageSrc } from '@/lib/images/placeholders';

export default function Partners() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const partnerTypes = [
    {
      category: "Corporate Partners",
      description: "Technology companies that provide resources, mentors, and sponsorship for our events.",
      logos: [
        { name: "TechCorp", logo: "/api/placeholder/150/50" },
        { name: "DevSolutions", logo: "/api/placeholder/150/50" },
        { name: "InnovateTech", logo: "/api/placeholder/150/50" },
        { name: "CodeWorks", logo: "/api/placeholder/150/50" },
        { name: "FutureSystems", logo: "/api/placeholder/150/50" }
      ]
    },
    {
      category: "Educational Institutions",
      description: "Schools and universities that help expand our reach and provide venues for our events.",
      logos: [
        { name: "Lincoln High School", logo: "/api/placeholder/150/50" },
        { name: "Westview Academy", logo: "/api/placeholder/150/50" },
        { name: "Tech University", logo: "/api/placeholder/150/50" },
        { name: "Metro School District", logo: "/api/placeholder/150/50" },
        { name: "Innovation Academy", logo: "/api/placeholder/150/50" }
      ]
    },
    {
      category: "Community Organizations",
      description: "Non-profits and community groups that help us connect with diverse student populations.",
      logos: [
        { name: "Youth Coding Alliance", logo: "/api/placeholder/150/50" },
        { name: "Community Tech Hub", logo: "/api/placeholder/150/50" },
        { name: "Digital Access Foundation", logo: "/api/placeholder/150/50" },
        { name: "Code for Change", logo: "/api/placeholder/150/50" },
        { name: "Future Coders Network", logo: "/api/placeholder/150/50" }
      ]
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
          <span className="label-uppercase mb-4 block">Partnerships</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
            Our <span className="heading-gradient">Partners</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            We collaborate with organizations that share our vision of empowering the next generation
            of technologists and innovators.
          </p>
        </motion.div>

        <div className="space-y-8">
          {partnerTypes.map((type, typeIndex) => (
            <motion.div
              key={type.category}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.2 * typeIndex }}
              className="card-glass rounded-xl p-8"
            >
              <h3 className="text-xl font-black tracking-tight text-white mb-2">{type.category}</h3>
              <p className="text-gray-500 mb-8 text-sm">{type.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {type.logos.map((partner, index) => (
                  <motion.div
                    key={partner.name}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index + 0.3 * typeIndex }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] p-4 flex items-center justify-center h-20 transition-all duration-300"
                  >
                    <div className="relative w-full h-full">
                      <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{
                          backgroundImage: `url(${resolveImageSrc(partner.logo, PLACEHOLDER_IMAGES.logo)})`,
                          backgroundSize: 'contain',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat'
                        }}
                      ></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA section with gradient border */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="card-gradient-border rounded-xl p-10 max-w-xl mx-auto">
            <h3 className="text-2xl font-black tracking-tight text-white mb-4">Interested in partnering with us?</h3>
            <p className="text-gray-500 mb-6">Join our network of organizations making a difference in tech education.</p>
            <a href="/contact" className="btn-primary inline-block">
              Get in Touch
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
