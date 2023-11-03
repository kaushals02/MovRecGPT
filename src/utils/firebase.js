// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmLwcs7unkBHzp9Dj3f_jLjdW8Ep0ME0I",
  authDomain: "clean-circle-402511.firebaseapp.com",
  projectId: "clean-circle-402511",
  storageBucket: "clean-circle-402511.appspot.com",
  messagingSenderId: "662424001722",
  appId: "1:662424001722:web:ffabb12c6ecb8ca17fb683"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
