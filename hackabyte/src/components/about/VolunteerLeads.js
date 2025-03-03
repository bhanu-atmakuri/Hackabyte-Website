import React from 'react';
import SectionTitle from '../common/SectionTitle';
import TeamMember from '../common/TeamMember';
import volunteerLeads from '../../data/volunteerLeads';

const VolunteerLeads = () => {
  return (
    <div className="mb-20">
      <SectionTitle title="Hackabyte Volunteer Leads" />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {volunteerLeads.map((member) => (
          <TeamMember
            key={member.id}
            name={member.name}
            role={member.role}
            image={member.image}
          />
        ))}
      </div>
    </div>
  );
};

export default VolunteerLeads;