import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "hat-on-me.firebaseapp.com",
  projectId: "hat-on-me",
  storageBucket: "hat-on-me.appspot.com",
  messagingSenderId: "493934729943",
  appId: "1:493934729943:web:faafd141962b47addfae92",
  measurementId: "G-ZTK7R0RYS4",
};

export const firebase = initializeApp(firebaseConfig);
export const auth = getAuth();
