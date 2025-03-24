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
import { eventService, EVENT_TYPES } from '@/lib/services/eventEmitterService';

const eventsCollection = 'events';

/**
 * Get all events from Firestore
 */
export async function getAllEvents() {
  try {
    eventService.emit(EVENT_TYPES.EVENTS_LOADING);
    
    const eventsRef = collection(db, eventsCollection);
    const q = query(eventsRef, orderBy('startDate', 'desc'));
    const snapshot = await getDocs(q);
    
    const events = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    eventService.emit(EVENT_TYPES.EVENTS_LOADED, events);
    return events;
  } catch (error) {
    console.error('Error getting events:', error);
    eventService.emit(EVENT_TYPES.EVENT_ERROR, error);
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
      const error = new Error('Event not found');
      eventService.emit(EVENT_TYPES.EVENT_ERROR, error);
      throw error;
    }
    
    const event = {
      id: eventSnap.id,
      ...eventSnap.data()
    };
    
    return event;
  } catch (error) {
    console.error('Error getting event:', error);
    eventService.emit(EVENT_TYPES.EVENT_ERROR, error);
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
    
    const newEventId = newEventRef.id;
    eventService.emit(EVENT_TYPES.EVENT_CREATED, { id: newEventId, ...eventData });
    return newEventId;
  } catch (error) {
    console.error('Error adding event:', error);
    eventService.emit(EVENT_TYPES.EVENT_ERROR, error);
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
    
    eventService.emit(EVENT_TYPES.EVENT_UPDATED, { id, ...eventData });
    return id;
  } catch (error) {
    console.error('Error updating event:', error);
    eventService.emit(EVENT_TYPES.EVENT_ERROR, error);
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
    
    eventService.emit(EVENT_TYPES.EVENT_DELETED, id);
    return true;
  } catch (error) {
    console.error('Error deleting event:', error);
    eventService.emit(EVENT_TYPES.EVENT_ERROR, error);
    throw error;
  }
}
