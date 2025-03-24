import { useEffect } from 'react';
import { eventService, EVENT_TYPES } from '@/lib/services/eventEmitterService';

/**
 * Custom hook for working with event emitter
 * @param {string} eventType - Event type from EVENT_TYPES
 * @param {Function} callback - Callback to execute when event is emitted
 */
export default function useEventEmitter(eventType, callback) {
  useEffect(() => {
    // Subscribe to the event
    eventService.subscribe(eventType, callback);
    
    // Cleanup on unmount
    return () => {
      eventService.unsubscribe(eventType, callback);
    };
  }, [eventType, callback]);
  
  return {
    emit: (data) => eventService.emit(eventType, data)
  };
}
