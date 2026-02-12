// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Add auth import
import { getStorage } from "firebase/storage";

// Firebase configuration with fallback values for build time
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "placeholder-api-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "placeholder-domain.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "placeholder-project",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "placeholder-bucket.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "000000000000",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "placeholder-app-id",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "placeholder-measurement-id"
};

const requiredConfigKeys = ['apiKey', 'authDomain', 'projectId'];
const hasPlaceholderValue = (value) =>
  typeof value === 'string' && value.startsWith('placeholder');

export const isFirebaseConfigured = requiredConfigKeys.every((key) => {
  const value = firebaseConfig[key];
  return Boolean(value) && !hasPlaceholderValue(value);
});

export const firebaseConfigError = isFirebaseConfigured
  ? null
  : 'Firebase is not configured. Add NEXT_PUBLIC_FIREBASE_* values in hackabyte/.env.local and restart the dev server.';

// Initialize Firebase only if it hasn't been initialized yet and we're on the client side
let app, db, auth, analytics, storage;

if (typeof window !== 'undefined') {
  if (!isFirebaseConfigured) {
    console.error(firebaseConfigError);
  } else {
    try {
      app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
      db = getFirestore(app);
      auth = getAuth(app);
      storage = getStorage(app);

      // Initialize Analytics (with client-side check to prevent SSR errors)
      isSupported().then(yes => yes && (analytics = getAnalytics(app)));
    } catch (error) {
      console.error("Firebase initialization error:", error);
    }
  }
}

export { db, analytics, auth, storage };
