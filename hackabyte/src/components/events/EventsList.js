import React from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../common/SectionTitle';

const EventsList = () => {
  return (
    <div className="mb-16">
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
  );
};

export default EventsList;