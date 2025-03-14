/**
 * Past Events Data Module
 * 
 * This module exports data structures related to the previous Hackabyte events,
 * including complete event details, filtering options, and metadata for the past events interface.
 */

/**
 * Array of past events with their complete details
 * @type {Array<{
 *   id: string,               - Unique identifier used in URLs and references
 *   title: string,            - Event title
 *   date: string,             - Formatted date string (e.g., "April 15-16, 2024")
 *   location: string,         - Venue name
 *   state: string,            - State where event was held
 *   country: string,          - Country where event was held
 *   year: number,             - Year the event took place
 *   ageGroups: Array<string>, - Target age groups that participated
 *   competitionLevel: string, - Level of competition (e.g., "State", "National")
 *   image: string,            - Path to event image
 *   description: string,      - Detailed event description
 *   highlights: Array<string>,- Key points about the event
 *   winners: Array<Object>,   - Information about winning teams and projects
 *   eventRecapLink: string    - Link to detailed event recap page
 * }>}
 */
export const pastEvents = [
  {
    id: "spring-hackathon-2024-wa",
    title: "Spring Hackathon 2024 - WA",
    date: "April 15-16, 2024",
    location: "DigiPen Institute of Technology, Redmond",
    state: "Washington",
    country: "United States",
    year: 2024,
    ageGroups: ["High School", "Middle School", "College"],
    competitionLevel: "State",
    image: "/api/placeholder/600/400",
    description: "Our Spring Hackathon 2024 in Washington brought together students from across the state for an intensive weekend of coding, collaboration, and innovation. Participants worked on solutions for real-world challenges.",
    highlights: [
      "Over 120 participants across all age groups",
      "15 completed projects submitted",
      "Workshops led by industry professionals",
      "Keynote speech by tech industry leader"
    ],
    winners: [
      {
        category: "High School Division",
        team: "Code Crushers",
        project: "EcoTrack - Environmental Monitoring System"
      },
      {
        category: "Middle School Division",
        team: "Young Innovators",
        project: "HealthBuddy - Wellness App for Teens"
      },
      {
        category: "College Division",
        team: "Algorithm Aces",
        project: "SmartCity Traffic Management"
      }
    ],
    eventRecapLink: "/events/past-events/spring-hackathon-2024-wa"
  },
  {
    id: "summer-hackathon-2024-wa",
    title: "Summer Hackathon 2024 - WA",
    date: "July 22-23, 2024",
    location: "University of Washington, Seattle",
    state: "Washington",
    country: "United States",
    year: 2024,
    ageGroups: ["High School", "Middle School"],
    competitionLevel: "State",
    image: "/api/placeholder/600/400",
    description: "The Summer Hackathon 2024 in Washington was focused on developing solutions for environmental challenges. Students collaborated in teams to create innovative applications and technologies addressing climate change and sustainability.",
    highlights: [
      "Over 150 participants from schools across Washington",
      "20 completed projects addressing environmental challenges",
      "Panel discussions with environmental experts",
      "Hands-on workshops on sustainable technology"
    ],
    winners: [
      {
        category: "High School Division",
        team: "Green Coders",
        project: "WaterSaver - Smart Irrigation System"
      },
      {
        category: "Middle School Division",
        team: "Future Technologists",
        project: "RecycleRight - AI-Powered Recycling Assistant"
      }
    ],
    eventRecapLink: "/events/past-events/summer-hackathon-2024-wa"
  }
];

/**
 * List of years with past events, used for filtering in the UI
 * @type {Array<number>}
 */
export const pastEventYears = [2024];

/**
 * List of states where events were held, including an "All States" option for filtering
 * @type {Array<string>}
 */
export const availableStates = ['All States', 'Washington'];
