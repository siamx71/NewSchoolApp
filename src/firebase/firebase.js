// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3qCzJeuCl9NDKNssZ-B00CJ7MYAyXig0",
  authDomain: "teachers-620a5.firebaseapp.com",
  projectId: "teachers-620a5",
  storageBucket: "teachers-620a5.firebasestorage.app",
  messagingSenderId: "561573289303",
  appId: "1:561573289303:web:bfad9a78da7e3a0bf4f212",
  measurementId: "G-0TFBC9KLSM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);

// Enable offline persistence so cached Firestore reads can work when offline.
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.warn('Firestore persistence failed: multiple tabs open.');
  } else if (err.code === 'unimplemented') {
    console.warn('Firestore persistence is not supported by this browser.');
  } else {
    console.warn('Firestore persistence error:', err);
  }
});