// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBqPAak9MG0iLxEczw9cEOLGKO1g9PORoU",
  authDomain: "baby-kicks-0.firebaseapp.com",
  projectId: "baby-kicks-0",
  storageBucket: "baby-kicks-0.appspot.com",
  messagingSenderId: "913625372474",
  appId: "1:913625372474:web:413446afedfc406868e203",
  measurementId: "G-PGSWGD2DQ2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
export { auth, provider, db };
