// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrLfrMa7DoiMkZP7yRx6UsSFonPck1smY",
  authDomain: "hackabyte-ee5d1.firebaseapp.com",
  projectId: "hackabyte-ee5d1",
  storageBucket: "hackabyte-ee5d1.firebasestorage.app",
  messagingSenderId: "415532944550",
  appId: "1:415532944550:web:cf7fd1ef16378c31457867",
  measurementId: "G-F2VLJJDSTP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};