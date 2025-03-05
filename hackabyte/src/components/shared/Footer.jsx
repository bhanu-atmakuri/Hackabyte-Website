'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Container from './Container';

export default function Footer() {
  // Current year for copyright
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
      <Container>
        <div className="py-12 md:py-16">
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
              
              <div className="text-gray-400 mb-6 max-w-md">
                Empowering young minds through coding challenges, teamwork, and innovation.
                Hackabyte provides hands-on hackathons for students of all ages.
              </div>
              
              <div className="flex flex-wrap gap-4">
                <a href="#" className="text-gray-400 hover:text-[#FF2247] transition-colors" aria-label="Facebook">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Links */}
            {footerSections.map((section, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-200">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link 
                        href={link.href} 
                        className="text-gray-400 hover:text-[#FF2247] transition-colors inline-block"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        <hr className="border-[#131435] border-t" />
        
        <div className="py-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} Hackabyte. All rights reserved.
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
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