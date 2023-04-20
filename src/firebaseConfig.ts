// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyB5Fz9veJX_iIJejsQKXXQzt9aeFH9tLeQ",
    authDomain: "didyousee-4b593.firebaseapp.com",
    projectId: "didyousee-4b593",
    storageBucket: "didyousee-4b593.appspot.com",
    messagingSenderId: "111037897832",
    appId: "1:111037897832:web:e99cd6c55f0c3d0ee76fdd",
    measurementId: "G-CC6N8JE5L6"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//initialize firebase auth
const auth = getAuth()


export { app, auth }