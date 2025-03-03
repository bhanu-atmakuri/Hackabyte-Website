import React from 'react';
import SectionTitle from '../components/common/SectionTitle';
import PastEvents from '../components/events/PastEvents';

const PastEventsPage = () => {
  return (
    <div className="py-16 bg-hackabyte-dark">
      <div className="container mx-auto px-4">
        <SectionTitle title="Past Events" />
        
        <PastEvents />
      </div>
    </div>
  );
};

export default PastEventsPage;