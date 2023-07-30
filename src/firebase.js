
import firebaseConfig from "./firebase.config";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import "react-toastify/dist/ReactToastify.css";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);


class Firebase {

  // AUTH ACTIONS ------------

  async signUp(value) {
    try {
      const data = await createUserWithEmailAndPassword(auth, value.email, value.password)
      return data
     
    }
    catch (err) {
      throw (err)
      // Rethrow the error to be caught in the onSignUps function
    }
  }

  async login(value) {
    try {
      const user = await signInWithEmailAndPassword(auth, value.email, value.password);
      localStorage.setItem("token", user.user.accessToken)
      return user;
    } catch (err) {
      console.error('error', err);
      throw err; // Rethrow the error to be caught in the onLogout function
    }
  }

  async logOut() {
    try {
      const user = auth.signOut();
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      return user;
    } catch (err) {
      console.error('error', err);
      throw err; // Rethrow the error to be caught in the onLogout function
    }
  }
}

const firebaseInstance = new Firebase();

export default firebaseInstance;
