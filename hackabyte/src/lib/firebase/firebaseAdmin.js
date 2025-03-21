/**
 * Firebase Admin SDK setup
 * This file should only be imported in server-side code
 */

// Mark this file as server-only to prevent client-side bundling
import 'server-only';

// Import Firebase Admin SDK
import admin from 'firebase-admin';

// Initialize Firebase Admin SDK (only once)
function getFirebaseAdmin() {
  if (admin.apps.length === 0) {
    // Check for required environment variables
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n');
    
    if (!projectId || !clientEmail || !privateKey) {
      console.error('Firebase Admin environment variables are missing');
      return null;
    }
    
    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
    } catch (error) {
      console.error('Error initializing Firebase Admin', error);
      return null;
    }
  }
  
  return admin;
}

// Get instances with lazy initialization
export function getAdminDb() {
  const adminInstance = getFirebaseAdmin();
  return adminInstance ? adminInstance.firestore() : null;
}

export function getAdminAuth() {
  const adminInstance = getFirebaseAdmin();
  return adminInstance ? adminInstance.auth() : null;
}

/**
 * Verify Firebase Auth token on server-side
 * @param {string} token - Firebase Auth ID token
 * @returns {Promise<Object|null>} User claims or null if verification fails
 */
export async function verifyAuthToken(token) {
  const auth = getAdminAuth();
  
  if (!auth) {
    console.error('Firebase Admin Auth is not initialized');
    return null;
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error('Error verifying auth token:', error);
    return null;
  }
}

/**
 * Check if a user has admin privileges
 * @param {string} uid - Firebase user ID
 * @returns {Promise<boolean>} True if user is an admin
 */
export async function isUserAdmin(uid) {
  const db = getAdminDb();
  
  if (!db) {
    console.error('Firebase Admin Firestore is not initialized');
    return false;
  }

  try {
    // Check the admins collection for this user
    const adminRef = db.collection('admins').doc(uid);
    const adminDoc = await adminRef.get();
    
    return adminDoc.exists;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}
