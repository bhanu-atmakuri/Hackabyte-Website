'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import Container from '@/components/shared/Container';

export default function JoinTeam() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const openPositions = [
    {
      title: "Event Coordinator",
      type: "Full-time",
      location: "San Francisco, CA or Remote",
      description: "Plan and execute hackathon events, managing logistics, venue coordination, and event timelines. Work closely with schools and venue partners to ensure successful events.",
      requirements: [
        "2+ years experience in event planning or coordination",
        "Strong organizational and communication skills",
        "Experience working with educational institutions preferred",
        "Ability to travel to event locations when necessary"
      ]
    },
    {
      title: "Curriculum Developer",
      type: "Part-time",
      location: "Remote",
      description: "Create age-appropriate coding challenges, workshops, and learning materials for our hackathon participants ranging from elementary to high school levels.",
      requirements: [
        "Background in computer science or related field",
        "Experience developing educational content",
        "Understanding of different age group learning capabilities",
        "Familiarity with various programming languages and technologies"
      ]
    },
    {
      title: "Community Outreach Specialist",
      type: "Full-time",
      location: "Multiple Locations",
      description: "Develop relationships with schools, community organizations, and technology partners to expand Hackabyte's reach and impact, with a focus on underrepresented communities.",
      requirements: [
        "Strong networking and relationship-building skills",
        "Experience in education, nonprofits, or community organizing",
        "Passion for increasing diversity in technology",
        "Excellent verbal and written communication abilities"
      ]
    }
  ];

  const benefits = [
    { title: "Make an Impact", description: "Work that directly contributes to increasing coding literacy and technology skills among young students across diverse backgrounds." },
    { title: "Collaborative Culture", description: "Join a team of passionate educators, technologists, and community builders who value collaboration, innovation, and inclusivity." },
    { title: "Growth Opportunities", description: "Develop your professional skills while working on meaningful projects in a fast-growing organization." },
    { title: "Flexible Work", description: "We offer remote work options and flexible schedules for many positions to support work-life balance." },
    { title: "Competitive Benefits", description: "Full-time positions include health insurance, professional development stipends, paid time off, and other competitive benefits." }
  ];

  const values = [
    "Inclusivity & Diversity",
    "Innovation & Creativity",
    "Continuous Learning",
    "Collaborative Problem-Solving",
    "Community Impact"
  ];

  return (
    <section id="careers" className="py-24 md:py-32 bg-[#0E0E11] relative" ref={ref}>
      <div className="absolute inset-0 bg-dots opacity-20 pointer-events-none"></div>
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="label-uppercase mb-4 block">Careers</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
            Join Our <span className="heading-gradient">Team</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Become part of a mission-driven organization dedicated to empowering the next generation of technology innovators and problem-solvers.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card-glass rounded-xl p-8 relative overflow-hidden"
          >
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#F93236] to-[#FF2247]"></div>
            <div className="pl-4">
              <h3 className="text-xl font-black tracking-tight text-white mb-6">Why Work With Us?</h3>
              <div className="space-y-5">
                {benefits.map((benefit) => (
                  <div key={benefit.title}>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-1">{benefit.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="sticky top-24">
              <div
                className="h-72 rounded-xl overflow-hidden relative mb-5"
                style={{
                  backgroundImage: 'url(/api/placeholder/600/400)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E11] to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-lg font-bold tracking-tight text-white mb-1">Join Our Mission</h3>
                  <p className="text-gray-400 text-sm">Our team members share a passion for education, technology, and creating opportunities for young people.</p>
                </div>
              </div>

              <div className="card-glass rounded-xl p-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Our Values</h4>
                <div className="space-y-2.5">
                  {values.map((value) => (
                    <div key={value} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#F93236] to-[#FF2247]"></div>
                      <p className="text-gray-400 text-sm">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-xl font-black tracking-tight text-white mb-8 text-center">Open Positions</h3>

          <div className="space-y-5">
            {openPositions.map((position, index) => (
              <motion.div
                key={position.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                className="card-glass rounded-xl overflow-hidden"
              >
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
                    <div>
                      <h4 className="text-lg font-bold tracking-tight text-white">{position.title}</h4>
                      <div className="flex flex-wrap items-center gap-3 mt-2">
                        <span className="text-xs font-bold uppercase tracking-wider bg-[#FF2247]/10 text-[#FF2247] px-3 py-1">
                          {position.type}
                        </span>
                        <span className="text-xs text-gray-500">{position.location}</span>
                      </div>
                    </div>
                    <div className="md:flex-shrink-0">
                      <Link href="/contact?subject=Job Application" className="btn-primary block text-center text-sm whitespace-nowrap">
                        Apply Now
                      </Link>
                    </div>
                  </div>

                  <p className="text-gray-500 text-sm mb-5 leading-relaxed">{position.description}</p>

                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Requirements</h5>
                    <ul className="list-disc pl-5 space-y-1 text-gray-400 text-sm">
                      {position.requirements.map((req, idx) => (
                        <li key={idx}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <h4 className="text-lg font-bold tracking-tight text-white mb-3">Don't see a position that fits your skills?</h4>
            <p className="text-gray-500 max-w-2xl mx-auto mb-8 text-sm leading-relaxed">
              We're always looking for talented individuals who are passionate about our mission.
              Send us your resume and tell us how you can contribute to Hackabyte.
            </p>
            <Link href="/contact" className="btn-secondary inline-block">
              Submit General Application
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
