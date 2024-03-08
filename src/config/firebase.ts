// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { connectAuthEmulator, getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDqSZT-oR6kOZaMfW0J9Rg53jJX5UhFR4E",
  authDomain: "yknot-ats.firebaseapp.com",
  projectId: "yknot-ats",
  storageBucket: "yknot-ats.appspot.com",
  messagingSenderId: "373449358865",
  appId: "1:373449358865:web:3df4c34e005443c7073bb0",
  measurementId: "G-65K7GH21NS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
connectFirestoreEmulator(db, "127.0.0.1", 8080);
connectAuthEmulator(auth, "http://127.0.0.1:9099");
connectStorageEmulator(storage, "127.0.0.1", 9199);
export default app;
