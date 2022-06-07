// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'blist-3e769.firebaseapp.com',
  projectId: 'blist-3e769',
  storageBucket: 'blist-3e769.appspot.com',
  messagingSenderId: '217026534352',
  appId: '1:217026534352:web:fc98c1ea2cb2428758f7d5',
  measurementId: 'G-3GGHTMT03X',
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Initialize firestore
const db = getFirestore();

// Initialize firebase auth
const auth = getAuth();

export { db, auth };
