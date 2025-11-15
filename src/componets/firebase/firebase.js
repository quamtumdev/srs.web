// firebase.js
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAxLyyO_pL0fkpzD5423c8f-70zYEVoUK0",

  authDomain: "fir-1-c0d88.firebaseapp.com",

  projectId: "fir-1-c0d88",

  storageBucket: "fir-1-c0d88.firebasestorage.app",

  messagingSenderId: "530047180065",

  appId: "1:530047180065:web:0849dabeb09a8c8ae4f260",

  measurementId: "G-3QE6PYG3TZ",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
