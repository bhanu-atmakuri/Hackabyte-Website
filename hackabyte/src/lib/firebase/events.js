import { db } from '@/app/firebaseConfig';
import { 
  collection, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  query,
  orderBy
} from 'firebase/firestore';

const eventsCollection = 'events';

/**
 * Get all events from Firestore
 */
export async function getAllEvents() {
  try {
    const eventsRef = collection(db, eventsCollection);
    const q = query(eventsRef, orderBy('startDate', 'desc'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting events:', error);
    throw error;
  }
}

/**
 * Get a single event by ID
 */
export async function getEvent(id) {
  try {
    const eventRef = doc(db, eventsCollection, id);
    const eventSnap = await getDoc(eventRef);
    
    if (!eventSnap.exists()) {
      throw new Error('Event not found');
    }
    
    return {
      id: eventSnap.id,
      ...eventSnap.data()
    };
  } catch (error) {
    console.error('Error getting event:', error);
    throw error;
  }
}

/**
 * Add a new event to Firestore
 */
export async function addEvent(eventData) {
  try {
    const eventsRef = collection(db, eventsCollection);
    const newEventRef = await addDoc(eventsRef, {
      ...eventData,
      hasPassed: eventData.hasPassed || false,
      createdAt: new Date().toISOString()
    });
    
    return newEventRef.id;
  } catch (error) {
    console.error('Error adding event:', error);
    throw error;
  }
}

/**
 * Update an existing event
 */
export async function updateEvent(id, eventData) {
  try {
    const eventRef = doc(db, eventsCollection, id);
    await updateDoc(eventRef, {
      ...eventData,
      updatedAt: new Date().toISOString()
    });
    
    return id;
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
}

/**
 * Delete an event
 */
export async function deleteEvent(id) {
  try {
    const eventRef = doc(db, eventsCollection, id);
    await deleteDoc(eventRef);
    return true;
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
}
