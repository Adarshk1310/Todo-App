// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNENr0ESbjMWoWdCgyFnbL14GKrSX-BaQ",
  authDomain: "todoapp-cde45.firebaseapp.com",
  projectId: "todoapp-cde45",
  storageBucket: "todoapp-cde45.appspot.com",
  messagingSenderId: "966927392355",
  appId: "1:966927392355:web:5eff0d4d72ffe5eedc2256"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db};