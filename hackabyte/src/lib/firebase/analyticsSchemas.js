/**
 * Firestore collections and schemas for analytics data
 */

export const COLLECTIONS = {
  PAGE_VIEWS: 'pageViews',
  USER_EVENTS: 'userEvents',
  EVENT_ANALYTICS: 'eventAnalytics',
  USER_ANALYTICS: 'userAnalytics',
  DAILY_METRICS: 'dailyMetrics',
  USERS: 'users',
  EVENTS: 'events',
  REGISTRATIONS: 'registrations'
};

export const SCHEMAS = {
  // Schema for page view record
  pageView: {
    userId: null, // String, nullable
    sessionId: '', // String
    page: '', // String
    timestamp: new Date(), // Date
    referrer: '', // String
    deviceType: '', // String (mobile, desktop, tablet)
    browser: '', // String
    country: '', // String
    city: '' // String
  },
  
  // Schema for user event record
  userEvent: {
    userId: null, // String, nullable
    sessionId: '', // String
    eventType: '', // String (click, form_submit, etc.)
    elementId: '', // String
    elementType: '', // String (button, link, form, etc.)
    page: '', // String
    timestamp: new Date(), // Date
    additionalData: {} // Object with any additional data
  },
  
  // Schema for event analytics
  eventAnalytic: {
    eventId: '', // String
    registrationCount: 0, // Number
    viewCount: 0, // Number
    attendanceCount: 0, // Number
    completionRate: 0, // Number (percentage)
    lastUpdated: new Date() // Date
  },
  
  // Schema for user analytics
  userAnalytic: {
    userType: '', // String (highSchool, middleSchool, etc.)
    count: 0, // Number
    lastUpdated: new Date() // Date
  },
  
  // Schema for daily metrics
  dailyMetric: {
    date: '', // String in YYYY-MM-DD format
    pageViews: 0, // Number
    uniqueVisitors: 0, // Number
    newUsers: 0, // Number
    eventRegistrations: 0, // Number
    avgSessionDuration: 0, // Number (in seconds)
    bounceRate: 0, // Number (percentage)
    topPages: [], // Array of strings
    topEvents: [], // Array of strings
    deviceBreakdown: { // Object
      desktop: 0, // Number (percentage)
      mobile: 0, // Number (percentage)
      tablet: 0 // Number (percentage)
    },
    sourcesBreakdown: { // Object
      direct: 0, // Number (percentage)
      social: 0, // Number (percentage)
      search: 0, // Number (percentage)
      referral: 0, // Number (percentage)
      email: 0 // Number (percentage)
    }
  }
};
