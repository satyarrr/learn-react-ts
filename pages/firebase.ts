// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIeH_gCKmeA7V0kCjZKkNu1oR0aOy_wz0",
  authDomain: "expense-tracker-22cf2.firebaseapp.com",
  projectId: "expense-tracker-22cf2",
  storageBucket: "expense-tracker-22cf2.appspot.com",
  messagingSenderId: "385726893353",
  appId: "1:385726893353:web:85a8fa342851b4eecc3b38",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
