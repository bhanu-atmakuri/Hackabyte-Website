import React from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/common/SectionTitle';
import Hero from '../components/home/Hero';
import NextEvent from '../components/home/NextEvent';
import EventTypes from '../components/home/EventTypes';
import AboutSection from '../components/home/AboutSection';

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Next Event Countdown */}
      <NextEvent />
      
      {/* About Section */}
      <AboutSection />
      
      {/* Donations Section */}
      <div className="py-16 bg-hackabyte-dark border-t border-gray-800">
        <div className="container mx-auto px-4">
          <SectionTitle title="Donations" />
          
          <div className="text-center mb-8 max-w-3xl mx-auto">
            <p className="text-lg mb-6">
              Hackabyte is a non-profit run by solely students. 
              All events and programs are fully free, but we 
              need funding to organize these events.
            </p>
            
            <a href="#" className="btn-primary text-lg inline-block">
              Donate
            </a>
          </div>
        </div>
      </div>
      
      {/* Event Types Section */}
      <EventTypes />
      
      {/* Event Sign-up Section */}
      <div className="py-16 bg-hackabyte-dark border-t border-gray-800">
        <div className="container mx-auto px-4">
          <SectionTitle title="Events Sign-up" />
          
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Winter Hackathon */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-hackabyte-gray rounded-lg p-6">
              <div>
                <h3 className="text-2xl font-bold">Winter Hackathon - CA</h3>
                <p className="text-gray-400">Date: March 8-9</p>
              </div>
              <Link to="/events/winter-hackathon" className="btn-primary">
                Sign Up &gt;
              </Link>
            </div>
            
            {/* Spring Hackathon */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-hackabyte-gray rounded-lg p-6">
              <div>
                <h3 className="text-2xl font-bold">Spring Hackathon - WA</h3>
                <p className="text-gray-400">Date: March 29-30</p>
              </div>
              <Link to="/events/spring-hackathon" className="btn-primary">
                Sign Up &gt;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;