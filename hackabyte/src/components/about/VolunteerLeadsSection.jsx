'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function VolunteerLeadsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const volunteerLeads = [
    {
      name: "Navneeth S",
      role: "Volunteer Lead",
      image: "/api/placeholder/300/300",
      bio: "Manages volunteer recruitment and training, ensuring our team is prepared to support participants."
    },
    {
      name: "Aryaman Agnihotri",
      role: "Volunteer Lead",
      image: "/api/placeholder/300/300",
      bio: "Coordinates volunteer schedules and assignments, making sure all aspects of our events have proper support."
    }
  ];

  return (
    <section className="py-20 bg-[#1A1A1E]" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#FF2247]">
            Hackabyte Volunteer Leads
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Meet the team that coordinates our volunteer efforts and supports our events
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {volunteerLeads.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-[#16161A] rounded-xl overflow-hidden border border-gray-800 hover:border-[#FF2247]/30 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 relative">
                  <div 
                    className="w-full h-48 md:h-full bg-gray-800"
                    style={{
                      backgroundImage: `url(${member.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#16161A] opacity-60 md:block hidden"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16161A] to-transparent opacity-60 md:hidden"></div>
                </div>
                
                <div className="p-6 md:w-2/3">
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-[#FF2247] font-medium mb-3">{member.role}</p>
                  <p className="text-gray-400">{member.bio}</p>
                  
                  <div className="flex mt-4 space-x-3">
                    <a href="#" className="text-gray-400 hover:text-[#FF2247] transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M22.162 5.656a8.384 8.384 0 01-2.402.658A4.196 4.196 0 0021.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 00-7.126 3.814 11.874 11.874 0 01-8.62-4.37 4.168 4.168 0 00-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 01-1.894-.523v.052a4.185 4.185 0 003.355 4.101 4.21 4.21 0 01-1.89.072A4.185 4.185 0 007.97 16.65a8.394 8.394 0 01-6.191 1.732 11.83 11.83 0 006.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 002.087-2.165l-.001-.001z"></path>
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-[#FF2247] transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-[#FF2247] transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-semibold text-white mb-4">Join Our Volunteer Team</h3>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6">
            We're always looking for passionate individuals to join our volunteer team and help make our events successful. Volunteers gain valuable experience, connect with industry professionals, and make a positive impact on the tech community.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a href="/volunteer" className="btn-primary inline-block">
              Apply to Volunteer
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}