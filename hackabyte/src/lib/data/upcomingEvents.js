/**
 * Upcoming Events Data Module
 * 
 * This module exports data structures related to the upcoming Hackabyte events,
 * including the events themselves and filtering options for the events interface.
 */

/**
 * Array of upcoming events with their complete details
 * @type {Array<{
 *   title: string,             - Event title
 *   date: string,              - Formatted date string (e.g., "March 8-9, 2025")
 *   location: string,          - Venue and city
 *   state: string,             - State where event is held
 *   ageGroups: Array<string>,  - Target age groups (e.g., "High School", "Middle School")
 *   image: string,             - Path to event image
 *   description: string,       - Detailed event description
 *   registrationLink: string,  - Link to registration page
 *   eventType: string,         - Type of event (e.g., "Hackathon", "Workshop")
 *   competitionLevel: string   - Level of competition (e.g., "State", "National")
 * }>}
 */
export const upcomingEvents = [
  {
    title: "Winter Hackathon - CA",
    date: "March 8-9, 2025",
    location: "Tech Innovation Center, San Francisco",
    state: "California",
    ageGroups: ["High School", "Middle School"],
    image: "/api/placeholder/600/400",
    description: "Join us for our Winter Hackathon in California! This two-day event will feature exciting challenges, workshops, and opportunities to network with tech professionals.",
    registrationLink: "/events#registration",
    eventType: "Hackathon",
    competitionLevel: "State"
  },
  {
    title: "Spring Hackathon - WA",
    date: "March 29-30, 2025",
    location: "DigiPen Institute of Technology, Redmond",
    state: "Washington",
    ageGroups: ["High School", "Middle School", "College"],
    image: "/api/placeholder/600/400",
    description: "Our Spring Hackathon in Washington will be held at DigiPen Institute of Technology. Collaborate with peers and build innovative projects in this intensive weekend event.",
    registrationLink: "/events#registration",
    eventType: "Hackathon",
    competitionLevel: "State"
  }
];

/**
 * List of states where events are held, including an "All States" option for filtering
 * @type {Array<string>}
 */
export const availableStates = ['All States', 'California', 'Washington'];

/**
 * List of competition levels for filtering events
 * @type {Array<string>}
 */
export const competitionLevels = ['All Levels', 'National', 'State', 'Regional'];
