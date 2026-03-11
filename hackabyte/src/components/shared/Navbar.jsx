'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '@/components/shared/Container';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const adminLoggedIn = sessionStorage.getItem('adminLoggedIn');
    const userLoggedIn = sessionStorage.getItem('userLoggedIn');

    if (adminLoggedIn === 'true') {
      setIsAdmin(true);
      setIsLoggedIn(true);
    } else if (userLoggedIn === 'true') {
      setIsAdmin(false);
      setIsLoggedIn(true);
    } else {
      setIsAdmin(false);
      setIsLoggedIn(false);
    }
  }, []);

  const isActive = (path) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Tab' || e.key === 'Escape') {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const navItems = [
    {
      name: 'Events',
      href: '/events',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Hackathons', href: '/events/hackathons' },
        { name: 'Past Events', href: '/events/past-events' }
      ]
    },
    { name: 'About', href: '/about', hasDropdown: false },
    { name: 'Join Us', href: '/join-us', hasDropdown: false },
    { name: 'Contact Us', href: '/contact', hasDropdown: false },
  ];

  const handleDropdownToggle = (index) => {
    if (activeDropdown === index) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(index);
    }
  };

  const buttonText = isLoggedIn ? "Dashboard" : "Sign In";
  const buttonLink = isLoggedIn ? (isAdmin ? '/admin' : '/dashboard') : '/auth';

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0D0D0F]/80 backdrop-blur-2xl border-b border-white/[0.05] py-3'
          : 'bg-transparent py-5'
      }`}
      style={{
        WebkitTransform: 'translate3d(0,0,0)',
        WebkitBackfaceVisibility: 'hidden'
      }}
    >
      <Container>
        <div className="relative flex items-center justify-between w-full px-1 sm:px-0">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-1 sm:space-x-2 justify-start safari-fix"
            style={{
              display: '-webkit-box',
              display: 'flex',
              WebkitBoxAlign: 'center',
              WebkitBoxPack: 'start',
              WebkitAlignItems: 'center',
              alignItems: 'center'
            }}
          >
            <div
              className="h-7 sm:h-9 md:h-10 lg:h-11 relative safari-logo-container"
              style={{
                minWidth: '40px',
                width: '40px',
                display: 'block',
                WebkitFlexShrink: 0,
                flexShrink: 0
              }}
            >
              <img
                src="/logo.png"
                alt="Hackabyte Logo"
                className="w-full h-full object-contain safari-logo-img"
                style={{
                  WebkitObjectFit: 'contain',
                  objectFit: 'contain'
                }}
              />
            </div>
            <span
              className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-black text-gray-100 tracking-tight safari-text"
              style={{
                WebkitBoxFlex: '0',
                WebkitFlex: '0 0 auto',
                flex: '0 0 auto'
              }}
            >
              Hackabyte
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 absolute left-1/2 -translate-x-1/2">
            {navItems.map((item, index) => (
              <div key={item.name}
                className={`relative ${item.hasDropdown ? 'group' : ''}`}
                ref={item.hasDropdown && index === 2 ? dropdownRef : null}
              >
                {item.hasDropdown ? (
                  <>
                    <Link
                      href={item.href}
                      className={`text-sm sm:text-base md:text-lg lg:text-xl font-medium transition-colors flex items-center py-2 whitespace-nowrap safari-nav-item ${
                        isActive(item.href) ? 'text-[#FF003C]' : 'text-white/80 hover:text-white'
                      }`}
                      onClick={() => setActiveDropdown(null)}
                    >
                      {item.name}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </Link>

                    <div className="absolute h-2 w-full left-0 bottom-0 z-10"></div>

                    {/* Dropdown - glassmorphism */}
                    <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 left-0 top-full w-48 shadow-2xl bg-[#0D0D0F]/90 backdrop-blur-2xl border border-white/[0.08] z-50 transition-all duration-200 overflow-hidden">
                      <div className="h-[2px] w-full bg-gradient-to-r from-[#F93236] to-[#FF2247]"></div>
                      <div className="py-1">
                        {item.dropdownItems.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="block px-4 py-2.5 text-sm sm:text-base md:text-lg text-gray-300 hover:bg-white/[0.05] hover:text-white whitespace-nowrap transition-colors"
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={item.href}
                      className={`text-sm sm:text-base md:text-lg lg:text-xl font-medium transition-colors whitespace-nowrap safari-nav-item ${
                        isActive(item.href) ? 'text-[#FF003C]' : 'text-white/80 hover:text-white'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center ml-auto">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href={buttonLink} className="btn-primary text-sm sm:text-base whitespace-nowrap">
                {buttonText}
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-300 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isMobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 1 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-0 bg-[#0D0D0F]/95 backdrop-blur-2xl border border-white/[0.05] shadow-2xl overflow-hidden"
            >
              <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col space-y-1 py-3 sm:py-4"
              >
                {navItems.map((item, index) => (
                  <div key={item.name}>
                    {item.hasDropdown ? (
                      <>
                        <div className="flex items-center justify-between">
                          <Link
                            href={item.href}
                            className="text-sm sm:text-base md:text-lg text-white/80 hover:text-white font-medium transition-colors px-4 py-0 sm:py-3 flex-grow text-left whitespace-nowrap"
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                            }}
                          >
                            {item.name}
                          </Link>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleDropdownToggle(index);
                            }}
                            className="px-4 py-2 sm:py-3"
                            aria-label={`Toggle ${item.name} dropdown`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className={`w-4 h-4 transition-transform ${activeDropdown === index ? 'rotate-180' : ''} text-white`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        </div>

                        <AnimatePresence>
                          {activeDropdown === index && (
                            <motion.div
                              initial={{ height: 0, opacity: 1 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 1 }}
                              transition={{ duration: 0.2 }}
                              className="pl-6 border-l-2 border-[#F93236]/30 ml-4 overflow-hidden"
                            >
                              <motion.div
                                initial={{ y: -10 }}
                                animate={{ y: 0 }}
                                exit={{ y: -10 }}
                                transition={{ duration: 0.2 }}
                              >
                                {item.dropdownItems.map((dropdownItem) => (
                                  <Link
                                    key={dropdownItem.name}
                                    href={dropdownItem.href}
                                    className="block py-1 sm:py-2 px-4 text-sm sm:text-base text-gray-400 hover:text-white whitespace-nowrap transition-colors"
                                    onClick={() => {
                                      setActiveDropdown(null);
                                      setIsMobileMenuOpen(false);
                                    }}
                                  >
                                    {dropdownItem.name}
                                  </Link>
                                ))}
                              </motion.div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-sm sm:text-base md:text-lg text-white/80 hover:text-white font-medium transition-colors px-4 py-2 sm:py-3 block whitespace-nowrap"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                <div className="px-4 pt-2">
                  <Link
                    href={buttonLink}
                    className="btn-primary text-sm block text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {buttonText}
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </motion.nav>
  );
}
