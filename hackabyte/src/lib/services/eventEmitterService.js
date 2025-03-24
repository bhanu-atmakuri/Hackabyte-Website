import { EventEmitter } from 'events';

// Create a singleton event emitter instance
const eventEmitter = new EventEmitter();

// Set max listeners to avoid memory leak warnings
eventEmitter.setMaxListeners(20);

// Event constants
export const EVENT_TYPES = {
  EVENT_CREATED: 'event:created',
  EVENT_UPDATED: 'event:updated',
  EVENT_DELETED: 'event:deleted',
  EVENTS_LOADING: 'events:loading',
  EVENTS_LOADED: 'events:loaded',
  EVENT_ERROR: 'event:error'
};

// Service functions
export const eventService = {
  // Subscribe to an event
  subscribe: (event, callback) => eventEmitter.on(event, callback),
  
  // Unsubscribe from an event
  unsubscribe: (event, callback) => eventEmitter.off(event, callback),
  
  // Emit an event
  emit: (event, data) => eventEmitter.emit(event, data),
  
  // Clean up all listeners for a specific event
  removeAllListeners: (event) => eventEmitter.removeAllListeners(event)
};
