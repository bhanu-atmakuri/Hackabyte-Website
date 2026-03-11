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
  orderBy,
  writeBatch
} from 'firebase/firestore';
import { eventService, EVENT_TYPES } from '@/lib/services/eventEmitterService';
import { toDateOnly } from '@/lib/dates/eventDates';

const eventsCollection = 'events';

function calculateHasPassed(eventData) {
  const endDate = toDateOnly(eventData?.endDate || eventData?.startDate);
  if (!endDate) return false;

  const today = toDateOnly(new Date());
  return Boolean(today && today > endDate);
}

function normalizeImageValue(value) {
  if (typeof value !== 'string') return '';
  return value.trim();
}

function normalizeEventForRead(eventData) {
  return {
    ...eventData,
    image: normalizeImageValue(eventData?.image),
    hasPassed: calculateHasPassed(eventData),
    showOnPastEventsPage: Boolean(eventData?.showOnPastEventsPage)
  };
}

function normalizeEventForWrite(eventData) {
  const payload = { ...eventData };
  delete payload.id;
  delete payload.createdAt;
  delete payload.updatedAt;

  payload.image = normalizeImageValue(payload.image);
  payload.hasPassed = calculateHasPassed(payload);
  payload.showOnPastEventsPage = Boolean(payload.showOnPastEventsPage);

  return payload;
}

function getSyncPayload(rawEvent, normalizedEvent) {
  const payload = {};

  if (rawEvent.hasPassed !== normalizedEvent.hasPassed) {
    payload.hasPassed = normalizedEvent.hasPassed;
  }

  if (rawEvent.showOnPastEventsPage !== normalizedEvent.showOnPastEventsPage) {
    payload.showOnPastEventsPage = normalizedEvent.showOnPastEventsPage;
  }

  return payload;
}

/**
 * Get all events from Firestore
 */
export async function getAllEvents() {
  try {
    eventService.emit(EVENT_TYPES.EVENTS_LOADING);
    
    const eventsRef = collection(db, eventsCollection);
    const q = query(eventsRef, orderBy('startDate', 'desc'));
    const snapshot = await getDocs(q);
    
    const rawEvents = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    const batch = writeBatch(db);
    let pendingUpdates = 0;
    const updatedAt = new Date().toISOString();

    const events = rawEvents.map((event) => {
      const normalizedEvent = normalizeEventForRead(event);
      const syncPayload = getSyncPayload(event, normalizedEvent);

      if (Object.keys(syncPayload).length > 0) {
        pendingUpdates += 1;
        batch.update(doc(db, eventsCollection, event.id), {
          ...syncPayload,
          updatedAt
        });
      }

      return normalizedEvent;
    });

    if (pendingUpdates > 0) {
      try {
        await batch.commit();
      } catch (syncError) {
        console.warn('Unable to sync event pass status to Firestore:', syncError);
      }
    }
    
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

    const normalizedEvent = normalizeEventForRead(event);
    const syncPayload = getSyncPayload(event, normalizedEvent);

    if (Object.keys(syncPayload).length > 0) {
      try {
        await updateDoc(eventRef, {
          ...syncPayload,
          updatedAt: new Date().toISOString()
        });
      } catch (syncError) {
        console.warn('Unable to sync single event pass status to Firestore:', syncError);
      }
    }
    
    return normalizedEvent;
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
    const normalizedEventData = normalizeEventForWrite(eventData);
    const eventsRef = collection(db, eventsCollection);
    const newEventRef = await addDoc(eventsRef, {
      ...normalizedEventData,
      createdAt: new Date().toISOString()
    });
    
    const newEventId = newEventRef.id;
    eventService.emit(EVENT_TYPES.EVENT_CREATED, { id: newEventId, ...normalizedEventData });
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
    const normalizedEventData = normalizeEventForWrite(eventData);
    const eventRef = doc(db, eventsCollection, id);
    await updateDoc(eventRef, {
      ...normalizedEventData,
      updatedAt: new Date().toISOString()
    });
    
    eventService.emit(EVENT_TYPES.EVENT_UPDATED, { id, ...normalizedEventData });
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
