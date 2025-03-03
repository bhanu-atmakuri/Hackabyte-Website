import React from 'react';
import SectionTitle from '../common/SectionTitle';
import { Link } from 'react-router-dom';

const AboutHero = ({ includeButton = false }) => {
  return (
    <div className="mb-20 flex flex-col md:flex-row items-center gap-12">
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
        
        {includeButton && (
          <Link to="/about" className="btn-primary">
            Learn More
          </Link>
        )}
      </div>
    </div>
  );
};

export default AboutHero;