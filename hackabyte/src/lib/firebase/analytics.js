import { db, analytics } from '@/app/firebaseConfig';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  orderBy, 
  limit, 
  startAfter,
  Timestamp 
} from 'firebase/firestore';
import { COLLECTIONS } from './analyticsSchemas';

/**
 * Fetches analytics data from Firestore
 * @param {string} timeRange - The time range for analytics data ('day', 'week', 'month', 'year')
 * @returns {Promise<Object>} Analytics data object
 */
export async function fetchAnalyticsData(timeRange = 'week') {
  console.log('Fetching analytics data for timeRange:', timeRange);
  try {
    // Calculate the start date based on timeRange
    const now = new Date();
    let startDate = new Date();
    
    switch(timeRange) {
      case 'day':
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
    }
    
    // Convert to Firestore Timestamp
    const startTimestamp = Timestamp.fromDate(startDate);
    
    // Fetch daily metrics from Firestore
    const metricsQuery = query(
      collection(db, COLLECTIONS.DAILY_METRICS),
      where('date', '>=', startTimestamp),
      orderBy('date', 'asc')
    );
    
    const metricsSnapshot = await getDocs(metricsQuery);
    const metricsData = metricsSnapshot.docs.map(doc => doc.data());
    
    // Fetch user analytics
    const userAnalyticsQuery = query(
      collection(db, COLLECTIONS.USER_ANALYTICS),
      orderBy('lastUpdated', 'desc'),
      limit(1)
    );
    
    const userAnalyticsSnapshot = await getDocs(userAnalyticsQuery);
    const userAnalytics = userAnalyticsSnapshot.docs[0]?.data() || {};
    
    // Fetch event analytics
    const eventQuery = query(
      collection(db, COLLECTIONS.EVENT_ANALYTICS),
      orderBy('lastUpdated', 'desc')
    );
    
    const eventSnapshot = await getDocs(eventQuery);
    const eventData = eventSnapshot.docs.map(doc => doc.data());
    
    // Process the data for the dashboard
    // If no data exists yet, fall back to mock data for development
    if (metricsData.length === 0) {
      console.warn('No metrics data found, using mock data');
      return generateMockData(timeRange);
    }
    
    // Format the real data for the dashboard
    const pageViews = formatPageViewData(metricsData, timeRange);
    const summary = calculateSummary(metricsData);
    const events = processEventData(eventData);
    const users = processUserData(userAnalytics);
    
    return {
      summary,
      pageViews,
      users,
      events
    };
    
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    // Show the complete error stack for debugging
    console.error(error.stack);
    // Fall back to mock data in case of error
    console.log('Returning mock data due to error');
    return generateMockData(timeRange);
  }
}

// Helper function to format page view data based on time range
function formatPageViewData(metricsData, timeRange) {
  // Implementation depends on your data structure
  // This is a simplified example
  return metricsData.map(metric => ({
    name: formatDateByTimeRange(metric.date.toDate(), timeRange),
    views: metric.pageViews,
    uniqueVisitors: metric.uniqueVisitors
  }));
}

// Format date based on time range
function formatDateByTimeRange(date, timeRange) {
  switch(timeRange) {
    case 'day':
      return date.getHours().toString();
    case 'week':
      return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
    case 'month':
      return date.getDate().toString();
    case 'year':
      return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()];
  }
}

// Calculate summary metrics
function calculateSummary(metricsData) {
  // Implement calculation logic based on your data
  // This is a placeholder
  return {
    totalUsers: metricsData.reduce((sum, day) => sum + day.newUsers, 0),
    userGrowth: calculateGrowth(metricsData, 'newUsers'),
    activeEvents: 8, // This would come from events collection
    eventGrowth: 25,
    pageViews: metricsData.reduce((sum, day) => sum + day.pageViews, 0),
    pageViewGrowth: calculateGrowth(metricsData, 'pageViews'),
    registrations: metricsData.reduce((sum, day) => sum + (day.eventRegistrations || 0), 0),
    registrationGrowth: calculateGrowth(metricsData, 'eventRegistrations')
  };
}

// Calculate growth percentage
function calculateGrowth(data, metric) {
  if (data.length < 2) return 0;
  
  const midpoint = Math.floor(data.length / 2);
  const firstHalf = data.slice(0, midpoint);
  const secondHalf = data.slice(midpoint);
  
  const firstSum = firstHalf.reduce((sum, item) => sum + (item[metric] || 0), 0);
  const secondSum = secondHalf.reduce((sum, item) => sum + (item[metric] || 0), 0);
  
  if (firstSum === 0) return secondSum > 0 ? 100 : 0;
  
  return Number((((secondSum - firstSum) / firstSum) * 100).toFixed(1));
}

// Process event data
function processEventData(eventData) {
  // Implementation depends on your data structure
  // Return formatted event data for the dashboard
  return {
    events: eventData.map(event => ({
      name: event.eventName,
      registrations: event.registrationCount,
      capacity: event.capacityCount || 150,
      attendance: event.attendanceCount
    })),
    // Add other required properties for the dashboard
    mostPopularEvent: findMostPopularEvent(eventData),
    highestCompletionRate: findHighestCompletionRate(eventData),
    upcomingEvents: 3, // This would come from a separate query
    avgRegistrations: calculateAvgRegistrations(eventData),
    avgRegistrationTrend: 8 // This would be calculated from historical data
  };
}

// Process user data
function processUserData(userAnalytics) {
  // Implementation depends on your data structure
  return {
    demographics: userAnalytics.demographics || [
      { name: 'High School', value: 420 },
      { name: 'Middle School', value: 320 },
      { name: 'Elementary', value: 280 },
      { name: 'College', value: 180 },
      { name: 'Other', value: 50 }
    ],
    sources: userAnalytics.sources || [
      { name: 'Direct', value: 580 },
      { name: 'Social', value: 290 },
      { name: 'Email', value: 180 },
      { name: 'Referral', value: 150 },
      { name: 'Search', value: 50 }
    ],
    devices: userAnalytics.devices || [
      { name: 'Desktop', value: 725 },
      { name: 'Mobile', value: 450 },
      { name: 'Tablet', value: 75 }
    ]
  };
}

// Helper functions for event data processing
function findMostPopularEvent(eventData) {
  if (eventData.length === 0) return null;
  
  const mostPopular = eventData.reduce((max, event) => 
    event.registrationCount > max.registrationCount ? event : max, eventData[0]);
  
  return {
    name: mostPopular.eventName,
    registrations: mostPopular.registrationCount,
    trend: mostPopular.trend || 15
  };
}

function findHighestCompletionRate(eventData) {
  if (eventData.length === 0) return null;
  
  const highest = eventData.reduce((max, event) => {
    const rate = event.registrationCount > 0 
      ? (event.attendanceCount / event.registrationCount) * 100 
      : 0;
    return rate > max.rate ? { event, rate } : max;
  }, { event: eventData[0], rate: 0 });
  
  return {
    name: highest.event.eventName,
    rate: Math.round(highest.rate),
    trend: highest.event.trend || 5
  };
}

function calculateAvgRegistrations(eventData) {
  if (eventData.length === 0) return 0;
  return Math.round(
    eventData.reduce((sum, event) => sum + event.registrationCount, 0) / eventData.length
  );
}

// Fall back to mock data for development
function generateMockData(timeRange) {
  // Keep your existing mock data generation function
  return {
    summary: {
      totalUsers: 1250,
      userGrowth: 12.5,
      activeEvents: 8,
      eventGrowth: 25,
      pageViews: 18500,
      pageViewGrowth: 8.3,
      registrations: 450,
      registrationGrowth: -3.2
    },
    pageViews: generatePageViewsData(timeRange),
    users: {
      demographics: [
        { name: 'High School', value: 420 },
        { name: 'Middle School', value: 320 },
        { name: 'Elementary', value: 280 },
        { name: 'College', value: 180 },
        { name: 'Other', value: 50 }
      ],
      sources: [
        { name: 'Direct', value: 580 },
        { name: 'Social', value: 290 },
        { name: 'Email', value: 180 },
        { name: 'Referral', value: 150 },
        { name: 'Search', value: 50 }
      ],
      devices: [
        { name: 'Desktop', value: 725 },
        { name: 'Mobile', value: 450 },
        { name: 'Tablet', value: 75 }
      ]
    },
    events: {
      events: [
        { name: 'HackByte Winter', registrations: 125, capacity: 150, attendance: 110 },
        { name: 'Code Challenge', registrations: 80, capacity: 100, attendance: 75 },
        { name: 'AI Workshop', registrations: 65, capacity: 75, attendance: 60 },
        { name: 'Web Dev Basics', registrations: 95, capacity: 100, attendance: 85 },
        { name: 'Game Jam', registrations: 110, capacity: 120, attendance: 105 }
      ],
      mostPopularEvent: {
        name: 'HackByte Winter',
        registrations: 125,
        trend: 15
      },
      highestCompletionRate: {
        name: 'Game Jam',
        rate: 95,
        trend: 5
      },
      upcomingEvents: 3,
      avgRegistrations: 95,
      avgRegistrationTrend: 8
    }
  };
}

// Keep your existing page views data generator
function generatePageViewsData(timeRange) {
  switch(timeRange) {
    case 'day':
      return Array.from({length: 24}, (_, i) => ({
        name: `${i}`,
        views: Math.floor(Math.random() * 300) + 100,
        uniqueVisitors: Math.floor(Math.random() * 150) + 50
      }));
    case 'week':
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      return days.map(day => ({
        name: day,
        views: Math.floor(Math.random() * 1000) + 500,
        uniqueVisitors: Math.floor(Math.random() * 500) + 200
      }));
    case 'month':
      return Array.from({length: 30}, (_, i) => ({
        name: `${i+1}`,
        views: Math.floor(Math.random() * 500) + 200,
        uniqueVisitors: Math.floor(Math.random() * 250) + 100
      }));
    case 'year':
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return months.map(month => ({
        name: month,
        views: Math.floor(Math.random() * 10000) + 5000,
        uniqueVisitors: Math.floor(Math.random() * 5000) + 2000
      }));
  }
}
