// firebase.js

import { initializeApp } from 'firebase/app'; // Import Firebase App initializer
import { getAuth } from 'firebase/auth'; // Import Firebase Auth module for authentication
import { getDatabase } from 'firebase/database'; // Import Firebase Database

// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLk5dIAnaWlVc51v7J8sjNDBbOocwoCW0",
  authDomain: "madproject-63fb1.firebaseapp.com",
  projectId: "madproject-63fb1",
  storageBucket: "madproject-63fb1.firebasestorage.app",
  messagingSenderId: "868560592088",
  appId: "1:868560592088:web:10bb3670da537cf8f58bad"
};

// Initialize Firebase app with the provided config
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const firebaseDatabase = getDatabase(app); // Create the database instance
const auth = getAuth(app); // Create the auth instance

// Export the instances for use in other parts of the app
export { auth, firebaseDatabase };
export default app;
