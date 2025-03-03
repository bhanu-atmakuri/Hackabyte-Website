import React from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../common/SectionTitle';

const AboutSection = () => {
  return (
    <div className="py-16 bg-hackabyte-dark border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <img 
              src="/images/logo.png" 
              alt="Hackabyte Logo" 
              className="w-64 h-64 mx-auto md:mx-0"
            />
          </div>
          
          <div className="md:w-1/2">
            <SectionTitle title="About Us" centered={false} underline={true} />
            
            <p className="text-lg mb-6">
              Founded in 2023, Hackabyte is a team of high school students who have experienced 
              and enjoyed many other hacking events, and now want to bring those same 
              experiences to you! Our events consist of mostly Hackathons, Challenges, and other 
              events like workshops.
            </p>
            
            <Link to="/about" className="btn-primary">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;