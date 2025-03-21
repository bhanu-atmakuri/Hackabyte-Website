import { analytics } from '@/app/firebaseConfig';
import { logEvent, setUserProperties } from 'firebase/analytics';
import { recordPageView, recordUserEvent } from './analyticsCollector';

/**
 * Log an event to Firebase Analytics
 * @param {string} eventName - Name of the event
 * @param {Object} params - Additional parameters for the event
 */
export function trackEvent(eventName, params = {}) {
  // Only log events if analytics is initialized and we're on client side
  if (analytics && typeof window !== 'undefined') {
    logEvent(analytics, eventName, {
      timestamp: new Date().toISOString(),
      ...params
    });
    console.log(`Analytics event logged: ${eventName}`, params);
  }
}

/**
 * Set user properties for analytics segmentation
 * @param {Object} properties - User properties to set
 */
export function setAnalyticsUserProperties(properties) {
  if (analytics && typeof window !== 'undefined') {
    setUserProperties(analytics, properties);
    console.log('User properties set for analytics', properties);
  }
}

/**
 * Track page view event
 * @param {string} pageName - Name of the page
 * @param {Object} additionalParams - Additional parameters
 */
export function trackPageView(pageName, additionalParams = {}) {
  // Google Analytics tracking
  if (analytics && typeof window !== 'undefined') {
    trackEvent('page_view', {
      page_title: pageName,
      page_location: window?.location?.href,
      page_path: window?.location?.pathname,
      ...additionalParams
    });
  }
  
  // Custom analytics tracking in Firestore
  const sessionId = getOrCreateSessionId();
  const userId = getUserId();
  
  // Record the page view in Firestore
  recordPageView({
    userId,
    sessionId,
    page: pageName,
    path: window?.location?.pathname,
    referrer: document.referrer,
    deviceType: getDeviceType(),
    browser: getBrowserInfo(),
    isNewVisitor: isNewVisitor()
  });
}

// Helper functions
function getOrCreateSessionId() {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = generateUUID();
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
}

function getUserId() {
  // Get user ID from auth if available
  return sessionStorage.getItem('userId') || null;
}

function getDeviceType() {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile';
  }
  return 'desktop';
}

function getBrowserInfo() {
  const ua = navigator.userAgent;
  let browser = 'unknown';
  
  if (ua.indexOf('Chrome') > -1) browser = 'Chrome';
  else if (ua.indexOf('Safari') > -1) browser = 'Safari';
  else if (ua.indexOf('Firefox') > -1) browser = 'Firefox';
  else if (ua.indexOf('MSIE') > -1 || ua.indexOf('Trident/') > -1) browser = 'IE';
  else if (ua.indexOf('Edge') > -1) browser = 'Edge';
  
  return browser;
}

function isNewVisitor() {
  if (!localStorage.getItem('has_visited')) {
    localStorage.setItem('has_visited', 'true');
    return true;
  }
  return false;
}

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Track event registration
 * @param {string} eventId - ID of the event
 * @param {string} eventName - Name of the event
 */
export function trackEventRegistration(eventId, eventName) {
  trackEvent('event_registration', {
    event_id: eventId,
    event_name: eventName
  });
}

/**
 * Track user login
 * @param {string} method - Login method used
 */
export function trackLogin(method = 'email') {
  trackEvent('login', { method });
}

/**
 * Track user signup
 * @param {string} method - Signup method used
 */
export function trackSignup(method = 'email') {
  trackEvent('sign_up', { method });
}

/**
 * Track form submission
 * @param {string} formName - Name of the form
 */
export function trackFormSubmission(formName) {
  trackEvent('form_submission', { form_name: formName });
}

/**
 * Track button click
 * @param {string} buttonName - Name of the button
 * @param {string} location - Location where the button was clicked
 */
export function trackButtonClick(buttonName, location) {
  trackEvent('button_click', {
    button_name: buttonName,
    location
  });
}

/**
 * Configure custom analytics parameters
 * Call this function once when your app initializes
 */
export function configureCustomAnalyticsParams() {
  if (analytics && typeof window !== 'undefined') {
    // Register custom parameters with Google Analytics
    // This lets GA know about these parameters for reports
    const customParams = [
      {
        name: 'user_type',  // e.g., "high_school", "middle_school"
        parameter_type: 'string',
      },
      {
        name: 'event_category', // e.g., "workshop", "hackathon"
        parameter_type: 'string',
      },
      {
        name: 'interaction_value', // a numeric value for interactions
        parameter_type: 'number',
      }
    ];
    
    // You would use these in your trackEvent function like:
    // trackEvent('event_registration', { 
    //   user_type: 'high_school',
    //   event_category: 'hackathon' 
    // });
  }
}
