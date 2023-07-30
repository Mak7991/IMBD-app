import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBhTOMmWXPaaI9xC1tnx8eLscCKCP6Xw24",
  authDomain: "imbd-app-2c9cc.firebaseapp.com",
  projectId: "imbd-app-2c9cc",
  storageBucket: "imbd-app-2c9cc.appspot.com",
  messagingSenderId: "719784672049",
  appId: "1:719784672049:web:cb2cd4acb00d0285df4e10",
  measurementId: "G-GNMB6LJF0G"
};

export default firebaseConfig;


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
