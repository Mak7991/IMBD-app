import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCgdNIwW-6zhK6x0iEMfZhK4tmUytGxJA4",
  authDomain: "imdb-e2849.firebaseapp.com",
  projectId: "imdb-e2849",
  storageBucket: "imdb-e2849.appspot.com",
  messagingSenderId: "345441748593",
  appId: "1:345441748593:web:b53ee89a65b7442361fdd0",
  measurementId: "G-MLMFCRCLNW"
};

export default firebaseConfig;


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
