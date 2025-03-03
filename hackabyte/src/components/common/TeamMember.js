import React from 'react';

const TeamMember = ({ name, role, image }) => {
  return (
    <div className="bg-hackabyte-gray rounded-lg overflow-hidden transition-transform hover:scale-105">
      <div className="h-64 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 bg-black bg-opacity-60">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-gray-300">{role}</p>
      </div>
    </div>
  );
};

export default TeamMember;