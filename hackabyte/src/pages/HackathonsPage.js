import React from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/common/SectionTitle';
import EventsList from '../components/events/EventsList';
import HackathonSchedule from '../components/events/HackathonSchedule';

const HackathonsPage = () => {
  return (
    <div className="py-16 bg-hackabyte-dark">
      <div className="container mx-auto px-4">
        <SectionTitle title="Hackathons" />
        
        {/* Events Sign-up Section */}
        <EventsList />
        
        {/* What is a Hackathon Section */}
        <div className="mb-16">
          <SectionTitle title="What is a Hackathon?" />
          
          <div className="max-w-4xl mx-auto">
            <p className="text-lg mb-6">
              Hackathons are events where students with an interest in STEM come together to 
              collaborate on innovative projects, learn new skills from various workshops, and 
              network with peers in a weekend full of coding and collaboration.
            </p>
          </div>
        </div>
        
        {/* Key Information Section */}
        <div className="mb-16">
          <SectionTitle title="Key Information" />
          
          <div className="max-w-4xl mx-auto space-y-8">
            <p className="text-lg">
              Our hackathons are two-day events, starting from the morning of one day to the evening of the 
              next. <strong>Food and drinks will be provided.</strong>
            </p>
            
            <div>
              <h3 className="text-xl font-bold mb-3">Teams:</h3>
              <p className="text-lg">
                Team size can be anywhere between 1-4 people, where every member must be within the 
                age requirements of the event. Participants can either sign up as a full team, sign up by themselves 
                and be added to a random team, or sign up as a partial team and get added with others.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-3">Materials:</h3>
              <p className="text-lg">All you're going to need to bring are:</p>
              <ul className="list-disc pl-8 text-lg">
                <li>A laptop and a charger</li>
                <li>Any other items that could be useful for your project</li>
                <li>That's it!</li>
              </ul>
              <p className="text-lg mt-3">
                Food, water, and snacks will be provided for you, so you don't have to worry about that. 
                Drinks can be purchased at vending machines at the center.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-3">Theme:</h3>
              <p className="text-lg">
                During the opening ceremony, a theme will be introduced to all participants. All groups must 
                create a project that solves a problem related to the theme. <em>More information about this will be 
                provided during the hackathon.</em>
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-3">Workshops:</h3>
              <p className="text-lg">
                During the competition period, there will be a multitude of educational workshops, talks 
                from industry experts, and other fun games. Despite this being optional, participants are 
                encouraged to attend and take advantage of all resources given to them. <em>Some workshops may be 
                very useful for your final submission.</em>
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-3">Submissions:</h3>
              <p className="text-lg">
                All submissions will be made online on Devpost, where groups can add written 
                descriptions, images, videos, and any other info about their project. Only one submission per group 
                is permitted.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-3">Presentations:</h3>
              <p className="text-lg">
                After submissions, participants will also create a small, 3 to 5-minute presentation 
                showcasing their projects to the judges in a science fair-type format. Groups will be expected to 
                explain their project, what problem it solves and how it solves it, and any other features they would 
                like to add. They will also be expected to answer any questions judges have in the end. The 6 finalists 
                will then be chosen out of all the projects, who will present a longer and more in-depth explanation 
                of their project.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-3">Judging/Scoring:</h3>
              <p className="text-lg">
                After all groups have presented in the first round, judges will rank groups from a set 
                of criteria (will be given during event). After 6 finalists are chosen, the process will be repeated but 
                will be more subjective (dependent on what the judges think about the projects). The teams with the 
                highest scores will be given prizes. <em>More information about this will be provided during the 
                hackathon.</em>
              </p>
            </div>
          </div>
        </div>
        
        {/* Spring Hackathon Schedule Section */}
        <HackathonSchedule />
      </div>
    </div>
  );
};

export default HackathonsPage;