import React from 'react';
import SectionTitle from '../common/SectionTitle';
import TeamMember from '../common/TeamMember';
import teamLuma from '../../data/teamLuma';

const TeamLuma = () => {
  return (
    <div>
      <SectionTitle title="Team LUMA" />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {teamLuma.map((member) => (
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

export default TeamLuma;