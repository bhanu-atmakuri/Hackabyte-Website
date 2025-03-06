'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Container from './Container';

export default function Footer() {
  // Use a stable value for the year to avoid hydration mismatch
  const currentYear = new Date().getFullYear();
  
  const footerSections = [
    {
      title: "About",
      links: [
        { name: "Our Mission", href: "/mission" },
        { name: "Our Team", href: "/team" },
        { name: "Sponsors", href: "/sponsors" },
        { name: "Careers", href: "/careers" },
        { name: "Press", href: "/press" }
      ]
    },
    {
      title: "Events",
      links: [
        { name: "Upcoming Hackathons", href: "/events" },
        { name: "Past Events", href: "/past-events" },
        { name: "Photo Gallery", href: "/gallery" },
        { name: "Success Stories", href: "/success-stories" },
        { name: "Volunteer", href: "/volunteer" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Coding Tutorials", href: "/tutorials" },
        { name: "Mentorship", href: "/mentorship" },
        { name: "FAQs", href: "/faqs" },
        { name: "Blog", href: "/blog" },
        { name: "Starter Kits", href: "/starter-kits" }
      ]
    },
    {
      title: "Contact",
      links: [
        { name: "info@hackabyte.org", href: "mailto:info@hackabyte.org" },
        { name: "Support", href: "/support" },
        { name: "Partner With Us", href: "/partners" },
        { name: "Sponsor an Event", href: "/sponsor" },
        { name: "Locations", href: "/locations" }
      ]
    }
  ];

  return (
    <footer className="bg-[#16161A] text-white">
      <Container className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo and info */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <motion.div whileHover={{ rotate: 10 }} transition={{ duration: 0.2 }}>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="32" 
                  height="32" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-[#F93236]"
                >
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
              </motion.div>
              <span className="text-xl font-bold">Hackabyte</span>
            </Link>
            
            <div className="text-gray-400 mb-6">
              Empowering young minds through coding challenges, teamwork, and innovation.
              Hackabyte provides hands-on hackathons for students of all ages.
            </div>
            
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#FF2247] transition-colors">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"></path>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4 text-gray-200">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href} 
                      className="text-gray-400 hover:text-[#FF2247] transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <hr className="border-[#131435] my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} Hackabyte. All rights reserved.
          </div>
          
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-gray-400 text-sm hover:text-[#FF2247] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 text-sm hover:text-[#FF2247] transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-gray-400 text-sm hover:text-[#FF2247] transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}