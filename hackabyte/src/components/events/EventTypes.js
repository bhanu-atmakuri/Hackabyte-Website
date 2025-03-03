import React from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../common/SectionTitle';

const EventTypes = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto mb-24">
      {/* Hackathons */}
      <div className="text-center">
        <div className="bg-hackabyte-red rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl font-bold">1</span>
        </div>
        <h3 className="text-2xl font-bold mb-4">Hackathons</h3>
        <p className="mb-6 text-gray-300">
          An in-person hackathon for high school students, 
          with workshops, food, swag, and more! You can 
          code using any language or platform you want, as 
          long as your project is related to the theme.
        </p>
        <Link to="/events/hackathons" className="btn-primary">
          Hackathons &gt;
        </Link>
      </div>
      
      {/* Challenges */}
      <div className="text-center">
        <div className="bg-hackabyte-red rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl font-bold">2</span>
        </div>
        <h3 className="text-2xl font-bold mb-4">Challenges</h3>
        <p className="mb-6 text-gray-300">
          A plethora of challenges (either individual or team) designed 
          for different age groups involving building apps/websites/games and 
          critical thinking/problem solving skills (the essentials to computer science).
        </p>
        <Link to="/events/challenges" className="btn-primary">
          Challenges &gt;
        </Link>
      </div>
    </div>
  );
};

export default EventTypes;