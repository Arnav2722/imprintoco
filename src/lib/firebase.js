// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyATwKvFnSXuk2EN6J0p-00OL1kDRHLl5Bo",
    authDomain: "imprintoco-97ed7.firebaseapp.com",
    projectId: "imprintoco-97ed7",
    storageBucket: "imprintoco-97ed7.firebasestorage.app",
    messagingSenderId: "508431967342",
    appId: "1:508431967342:web:db74898f729ade03eaf27f",
    measurementId: "G-BVR381S77P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();