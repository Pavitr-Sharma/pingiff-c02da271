import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, RecaptchaVerifier } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBaFuw33zzZUme7CDUb7dpII3YeKgimN4w",
  authDomain: "pingmereg.firebaseapp.com",
  projectId: "pingmereg",
  storageBucket: "pingmereg.firebasestorage.app",
  messagingSenderId: "1098521383686",
  appId: "1:1098521383686:web:b2c777e80121311a144487",
  databaseURL: "https://pingmereg-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const realtimeDb = getDatabase(app);
export const googleProvider = new GoogleAuthProvider();

// RecaptchaVerifier for phone auth
export const setupRecaptcha = (containerId: string) => {
  return new RecaptchaVerifier(auth, containerId, {
    size: "invisible",
    callback: () => {},
  });
};

export default app;
