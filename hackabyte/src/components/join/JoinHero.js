import React from 'react';
import SectionTitle from '../common/SectionTitle';

const JoinHero = () => {
  return (
    <div className="mb-12 text-center">
      <SectionTitle title="Join Us!" />
      
      <p className="text-xl max-w-3xl mx-auto mb-8">
        Be part of our community and help us inspire the next generation of tech innovators.
        We're always looking for passionate volunteers and mentors to join our team.
      </p>
      
      <div className="relative overflow-hidden max-w-4xl mx-auto rounded-lg">
        <img 
          src="/images/join-us-hero.jpg" 
          alt="Volunteers at Hackabyte" 
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-6 text-center w-full">
            <h2 className="text-2xl font-bold">Make an Impact</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinHero;