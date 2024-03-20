// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBktB68Wa0N_DeEDDqoTdexpVMA9sI2CGo",
  authDomain: "react-disney-plus-app-ef184.firebaseapp.com",
  projectId: "react-disney-plus-app-ef184",
  storageBucket: "react-disney-plus-app-ef184.appspot.com",
  messagingSenderId: "903853598442",
  appId: "1:903853598442:web:c83245e9e2112bb3edd993",
  measurementId: "G-WTLZJ8VJ16"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;