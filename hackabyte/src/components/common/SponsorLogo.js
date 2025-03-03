import React from 'react';

const SponsorLogo = ({ name, logo, url }) => {
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="bg-hackabyte-gray rounded-lg overflow-hidden p-6 transition-transform hover:scale-105 flex items-center justify-center"
    >
      <img 
        src={logo} 
        alt={name}
        className="max-w-full max-h-20"
      />
    </a>
  );
};

export default SponsorLogo;