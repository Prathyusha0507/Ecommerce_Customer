import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
/* Reference from https://firebase.google.com/docs/auth/web/password-auth */
const firebaseConfig = {
  apiKey: "AIzaSyBp30JUbr9eWALQVM5WdWScUb3WR8P_dnk",
  authDomain: "e-commerce-29d39.firebaseapp.com",
  projectId: "e-commerce-29d39",
  storageBucket: "e-commerce-29d39.appspot.com",
  messagingSenderId: "607205974459",
  appId: "1:607205974459:web:23bb30924cf0a61a19249e",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
export { app, auth };
