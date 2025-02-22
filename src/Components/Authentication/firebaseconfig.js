// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDeA6tSmnuVxUDH9GvRrfMY3yMKGhvEXsw",
  authDomain: "to-do-a185e.firebaseapp.com",
  projectId: "to-do-a185e",
  storageBucket: "to-do-a185e.firebasestorage.app",
  messagingSenderId: "338142616870",
  appId: "1:338142616870:web:32f48df7b95ff5d39075e7",
  measurementId: "G-DR8S3CDYVW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;