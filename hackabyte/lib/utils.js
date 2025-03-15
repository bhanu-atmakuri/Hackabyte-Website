/**
 * Utility functions for consistent data handling
 */

/**
 * Safely converts a Mongoose document to a plain JavaScript object.
 * If the input is already a plain object, it will be returned as is.
 * 
 * @param {Object} doc - Mongoose document or plain JavaScript object
 * @returns {Object} - Plain JavaScript object
 */
export function toPlainObject(doc) {
  // Check if doc is null or undefined
  if (!doc) {
    return doc;
  }
  
  // Check if it's an array, and if so, process each item
  if (Array.isArray(doc)) {
    return doc.map(item => toPlainObject(item));
  }
  
  // If it's a Mongoose document with a toObject method, convert it
  if (doc && typeof doc.toObject === 'function') {
    return doc.toObject();
  }
  
  // If it's already a plain object, return it as is
  return doc;
}
