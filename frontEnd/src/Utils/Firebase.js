// Import the functions you need from the SDKs you need
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "mentor-link-88045.firebaseapp.com",
  projectId: "mentor-link-88045",
  storageBucket: "mentor-link-88045.firebasestorage.app",
  messagingSenderId: "976233288669",
  appId: "1:976233288669:web:865948dcdc35f9a24ddc34"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth,provider}