'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Container from './Container';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "About",
      links: [
        { name: "Our Mission", href: "/about#mission" },
        { name: "Our Team", href: "/about#team" },
        { name: "Join Us", href: "/join-us" },
        { name: "Contact", href: "/contact" }
      ]
    },
    {
      title: "Events",
      links: [
        { name: "Upcoming Hackathons", href: "/events#upcoming" },
        { name: "Past Events", href: "/events/past-events" },
        { name: "Hackathon Details", href: "/events/hackathons" },
        { name: "Registration", href: "/events#registration" },
        { name: "Volunteer", href: "/join-us#volunteer" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Mentorship", href: "/join-us#mentor" },
        { name: "Sponsorship", href: "/join-us#sponsor" },
        { name: "Join Team", href: "/join-us#team" },
        { name: "Sign In", href: "/auth" },
        { name: "Age Groups", href: "/#age-groups" }
      ]
    },
    {
      title: "Contact",
      links: [
        { name: "info@hackabyte.org", href: "mailto:info@hackabyte.org" },
        { name: "Support", href: "/contact" },
        { name: "Partner With Us", href: "/join-us#sponsor" },
        { name: "Sponsor an Event", href: "/join-us#sponsor" },
        { name: "Contact Form", href: "/contact" }
      ]
    }
  ];

  return (
    <footer className="relative bg-[#0D0D0F] text-white overflow-hidden">
      {/* Gradient accent line at top */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#F93236] to-transparent"></div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none"></div>

      <Container className="relative py-12 md:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
          {/* Logo and description */}
          <div className="col-span-2 sm:col-span-2 md:col-span-1 mb-6 md:mb-0">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <motion.div whileHover={{ rotate: 10 }} transition={{ duration: 0.2 }}>
                <div className="w-10 h-10 relative">
                  <img
                    src="/logo.png"
                    alt="Hackabyte Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              </motion.div>
              <span className="text-xl font-black tracking-tight">Hackabyte</span>
            </Link>

            <div className="text-gray-500 mb-6 text-sm leading-relaxed">
              Empowering young minds through coding challenges, teamwork, and innovation.
              Hackabyte provides hands-on hackathons for students of all ages.
            </div>

            {/* Social icons in glass containers */}
            <div className="flex space-x-3">
              {[
                { href: "https://facebook.com/hackabyte", label: "Facebook", path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
                { href: "https://twitter.com/hackabyte", label: "Twitter", path: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" },
                { href: "https://instagram.com/hackabyte", label: "Instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
                { href: "https://linkedin.com/company/hackabyte", label: "LinkedIn", path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" }
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.1] hover:border-[#FF2247]/30 transition-all duration-300"
                  aria-label={social.label}
                >
                  <svg fill="currentColor" className="w-4 h-4 text-gray-400" viewBox="0 0 24 24">
                    <path d={social.path}></path>
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          {footerSections.map((section, index) => (
            <div key={index} className="md:col-span-1">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#FF2247] mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-gray-500 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Gradient divider */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/[0.1] to-transparent my-8 md:my-10"></div>

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 text-sm mb-6 md:mb-0 text-center md:text-left">
            &copy; {currentYear} Hackabyte. All rights reserved.
          </div>

          <div className="flex flex-wrap justify-center md:justify-end gap-4 md:space-x-6">
            <Link href="/contact" className="text-gray-600 text-sm hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="text-gray-600 text-sm hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-gray-600 text-sm hover:text-white transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
