// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJDjNWrmANKdK-1URXB4Pe61t5Eb616PM",
  authDomain: "zhu-library.firebaseapp.com",
  projectId: "zhu-library",
  storageBucket: "zhu-library.firebasestorage.app",
  messagingSenderId: "210853663011",
  appId: "1:210853663011:web:1e30ed1e41f3b9658d7c96"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore()
export default db