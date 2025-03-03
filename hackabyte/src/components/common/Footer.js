import React from 'react';
import { Link } from 'react-router-dom';
import SocialIcons from './SocialIcons';

const Footer = () => {
  return (
    <footer className="bg-hackabyte-dark py-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              <img 
                src="/images/logo.png" 
                alt="Hackabyte Logo" 
                className="h-16"
              />
              <span className="ml-2 text-3xl font-bold">Hackabyte</span>
            </Link>
          </div>

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-12">
            <div>
              <h3 className="font-semibold text-lg mb-3">Links:</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <Link to="/" className="hover:text-hackabyte-red transition-colors">Home</Link>
                <Link to="/about" className="hover:text-hackabyte-red transition-colors">About</Link>
                <Link to="/events" className="hover:text-hackabyte-red transition-colors">Events</Link>
                <Link to="/contact" className="hover:text-hackabyte-red transition-colors">Contact Us</Link>
                <Link to="/luma" className="hover:text-hackabyte-red transition-colors">LUMA</Link>
                <Link to="/donate" className="hover:text-hackabyte-red transition-colors">Donate</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              <p>Hackabyte is a student-led organization fiscally sponsored by Hack Club, a 501(c)(3) nonprofit, and focused on promoting community engagement and improving STEM exposure for students.</p>
              <p className="mt-2">© 2024 Hackabyte. All Rights Reserved</p>
              <p>Fiscally sponsored by The Hack Foundation.</p>
              <p>Nonprofit EIN: 81-2908499</p>
            </div>

            <div className="flex flex-col items-center md:items-end">
              <div className="mb-4">
                <SocialIcons />
              </div>
              <p className="text-sm text-gray-400">
                Interested in sponsoring our events/challenges?<br />
                Send us an email at teamhackabyte@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;