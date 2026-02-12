/**
 * Firebase client utilities
 * Helper functions for common Firebase operations
 */
import { auth, db, firebaseConfigError } from '@/app/firebaseConfig';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  serverTimestamp
} from 'firebase/firestore';

function getConfigError() {
  return new Error(
    firebaseConfigError || 'Firebase is not configured. Add NEXT_PUBLIC_FIREBASE_* values and restart the app.'
  );
}

function requireAuthClient() {
  if (!auth) {
    throw getConfigError();
  }
}

function requireFirestoreClient() {
  if (!db) {
    throw getConfigError();
  }
}

/**
 * Sign in with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} User credential
 */
export async function signIn(email, password) {
  try {
    requireAuthClient();
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Check if user is an admin
    const isAdmin = await checkAdminStatus(userCredential.user.uid);
    
    // If admin, set a secure cookie with an expiration (7 days)
    if (isAdmin && typeof document !== 'undefined') {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 7);
      document.cookie = `admin_token=${userCredential.user.uid}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Strict; Secure`;
    }
    
    return userCredential;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
}

/**
 * Sign up with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {string} name - User's display name
 * @returns {Promise<Object>} User credential
 */
export async function signUp(email, password, name) {
  try {
    requireAuthClient();
    requireFirestoreClient();

    // Create the user account
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update profile with display name
    await updateProfile(userCredential.user, { displayName: name });
    
    // Create user document in Firestore
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      email,
      name,
      createdAt: serverTimestamp(),
      role: 'user',
    });
    
    return userCredential;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
}

/**
 * Sign out the current user
 * @returns {Promise<void>}
 */
export async function logOut() {
  try {
    requireAuthClient();
    await signOut(auth);
    // Clear all session storage related to authentication
    sessionStorage.removeItem('userLoggedIn');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('adminLoggedIn');
    sessionStorage.removeItem('adminEmail');
    sessionStorage.removeItem('adminId');
    
    // Also clear any relevant cookies
    if (typeof document !== 'undefined') {
      document.cookie = 'admin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
}

/**
 * Send password reset email
 * @param {string} email - User email
 * @returns {Promise<void>}
 */
export async function resetPassword(email) {
  try {
    requireAuthClient();
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
}

/**
 * Check if user is an admin
 * @param {string} uid - User ID
 * @returns {Promise<boolean>} True if user is an admin
 */
export async function checkAdminStatus(uid) {
  try {
    if (!db) {
      return false;
    }
    const adminDoc = await getDoc(doc(db, 'admins', uid));
    return adminDoc.exists();
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}

/**
 * Get current user with additional data from Firestore
 * @returns {Promise<Object|null>} User object with Firestore data
 */
export async function getCurrentUser() {
  if (!auth) {
    return null;
  }

  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        unsubscribe();
        
        if (!user) {
          resolve(null);
          return;
        }
        
        try {
          // Get additional user data from Firestore
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          
          if (userDoc.exists()) {
            // Combine auth user with Firestore data
            resolve({
              ...user,
              ...userDoc.data()
            });
          } else {
            resolve(user);
          }
        } catch (error) {
          console.error('Error getting user data:', error);
          resolve(user);
        }
      },
      reject
    );
  });
}

/**
 * Subscribe to auth state changes
 * @param {Function} callback - Function to call when auth state changes
 * @returns {Function} Unsubscribe function
 */
export function subscribeToAuthChanges(callback) {
  if (!auth) {
    callback(null);
    return () => {};
  }

  return onAuthStateChanged(auth, callback);
}
