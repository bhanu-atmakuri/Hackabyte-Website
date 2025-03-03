import React from 'react';
import SectionTitle from '../common/SectionTitle';
import SponsorLogo from '../common/SponsorLogo';

const Sponsors = ({ sponsors }) => {
  if (!sponsors || sponsors.length === 0) return null;

  return (
    <div className="mb-16">
      <SectionTitle title="Thank you to all our sponsors!" />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sponsors.map((sponsor, index) => (
          <SponsorLogo
            key={index}
            name={sponsor.name}
            logo={sponsor.logo}
            url={sponsor.url}
          />
        ))}
      </div>
    </div>
  );
};

export default Sponsors;