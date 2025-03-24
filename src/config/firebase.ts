import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// These config values are public and meant to be used in browser clients
// Security is enforced through Firebase Authentication and Security Rules
const firebaseConfig = {
  apiKey: "AIzaSyBmonNHbmUmaq7tJfQ3co1LNqOoUZaQyMk",
  authDomain: "wedding-hs79.firebaseapp.com",
  projectId: "wedding-hs79",
  storageBucket: "wedding-hs79.firebasestorage.app",
  messagingSenderId: "467415869",
  appId: "1:467415869:web:38908580c0d68211b58b54",
  measurementId: "G-YJTMN4PE61"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app); 