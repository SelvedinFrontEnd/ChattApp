import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import  {getFirestore } from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyCl0r_RNpQSZE6jk7fSyYMW8LTK4XuRsg4",
  authDomain: "chatapp-be9b2.firebaseapp.com",
  projectId: "chatapp-be9b2",
  storageBucket: "chatapp-be9b2.appspot.com",
  messagingSenderId: "686886606515",
  appId: "1:686886606515:web:889e69ca6e7912d697c2c6",
  measurementId: "G-PYQPVMM8H0"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)