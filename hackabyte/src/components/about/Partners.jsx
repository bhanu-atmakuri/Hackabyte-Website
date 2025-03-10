'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from '../shared/Container';

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
    <section className="py-20 bg-[#1A1A1E]" ref={ref}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#FF2247]">
            Our Partners
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            We collaborate with organizations that share our vision of empowering the next generation 
            of technologists and innovators.
          </p>
        </motion.div>

        <div className="space-y-16">
          {partnerTypes.map((type, typeIndex) => (
            <motion.div 
              key={type.category}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.2 * typeIndex }}
              className="bg-[#16161A] p-8 rounded-xl border border-gray-800"
            >
              <h3 className="text-2xl font-bold text-[#FF2247] mb-4">{type.category}</h3>
              <p className="text-gray-300 mb-8">{type.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {type.logos.map((partner, index) => (
                  <motion.div 
                    key={partner.name}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index + 0.3 * typeIndex }}
                    className="bg-[#1A1A1E] p-4 rounded-lg flex items-center justify-center h-24 border border-gray-800 hover:border-[#FF2247]/30 transition-all duration-300"
                  >
                    <div className="relative w-full h-full">
                      <div 
                        className="absolute inset-0 flex items-center justify-center"
                        style={{
                          backgroundImage: `url(${partner.logo})`,
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
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Interested in partnering with us?</h3>
          <a href="/contact" className="btn-primary inline-block">
            Get in Touch
          </a>
        </motion.div>
      </Container>
    </section>
  );
}