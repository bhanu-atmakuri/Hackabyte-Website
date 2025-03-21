import { db } from '@/app/firebaseConfig';
import { 
  collection, 
  doc, 
  setDoc, 
  serverTimestamp, 
  increment, 
  runTransaction 
} from 'firebase/firestore';
import { COLLECTIONS } from './analyticsSchemas';

/**
 * Record a page view in Firestore
 * @param {Object} pageView - Page view data
 */
export async function recordPageView(pageView) {
  try {
    // Store the detailed page view
    await setDoc(doc(collection(db, COLLECTIONS.PAGE_VIEWS)), {
      ...pageView,
      timestamp: serverTimestamp()
    });
    
    // Update daily metrics
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dateStr = today.toISOString().split('T')[0];
    
    const dailyMetricRef = doc(db, COLLECTIONS.DAILY_METRICS, dateStr);
    await setDoc(dailyMetricRef, {
      date: today,
      pageViews: increment(1),
      uniqueVisitors: increment(pageView.isNewVisitor ? 1 : 0),
      lastUpdated: serverTimestamp()
    }, { merge: true });
    
    console.log('Page view recorded successfully');
  } catch (error) {
    console.error('Error recording page view:', error);
  }
}

/**
 * Record a user event in Firestore
 * @param {Object} userEvent - User event data
 */
export async function recordUserEvent(userEvent) {
  try {
    await setDoc(doc(collection(db, COLLECTIONS.USER_EVENTS)), {
      ...userEvent,
      timestamp: serverTimestamp()
    });
    
    console.log('User event recorded successfully');
  } catch (error) {
    console.error('Error recording user event:', error);
  }
}

/**
 * Record an event registration
 * @param {string} eventId - Event ID
 * @param {string} userId - User ID
 */
export async function recordEventRegistration(eventId, userId) {
  try {
    // Update event analytics
    const eventAnalyticRef = doc(db, COLLECTIONS.EVENT_ANALYTICS, eventId);
    
    await runTransaction(db, async (transaction) => {
      // Get the event analytics document
      const eventDoc = await transaction.get(eventAnalyticRef);
      
      // Create or update the event analytics document
      if (!eventDoc.exists()) {
        transaction.set(eventAnalyticRef, {
          eventId,
          registrationCount: 1,
          viewCount: 0,
          attendanceCount: 0,
          lastUpdated: serverTimestamp()
        });
      } else {
        transaction.update(eventAnalyticRef, {
          registrationCount: increment(1),
          lastUpdated: serverTimestamp()
        });
      }
      
      // Update daily metrics
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const dateStr = today.toISOString().split('T')[0];
      
      const dailyMetricRef = doc(db, COLLECTIONS.DAILY_METRICS, dateStr);
      transaction.set(dailyMetricRef, {
        date: today,
        eventRegistrations: increment(1),
        lastUpdated: serverTimestamp()
      }, { merge: true });
    });
    
    console.log('Event registration recorded successfully');
  } catch (error) {
    console.error('Error recording event registration:', error);
  }
}
