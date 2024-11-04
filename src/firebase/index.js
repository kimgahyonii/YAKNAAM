// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "friebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCjn_hBb-KgMyk4UbAnvII8XbihSBNkCfs",
    authDomain: "yaknaam-2a706.firebaseapp.com",
    projectId: "yaknaam-2a706",
    storageBucket: "yaknaam-2a706.firebasestorage.app",
    messagingSenderId: "490237325817",
    appId: "1:490237325817:web:319acef4dbaf47595b4d28",
    measurementId: "G-J2MG38M0YQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
// analytics = getAnalytics(app);
export const db = getFirestore(app);
export const USER_COLLECTION = collection(db, "users");