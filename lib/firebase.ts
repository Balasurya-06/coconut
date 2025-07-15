// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getFunctions } from "firebase/functions"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByPzN-1XwT9xeAfvImLgB9Hdw-UCEYBxA",
  authDomain: "surya-coconuts.firebaseapp.com",
  projectId: "surya-coconuts",
  storageBucket: "surya-coconuts.firebasestorage.app",
  messagingSenderId: "262683021914",
  appId: "1:262683021914:web:84f9200d046ab94faa3e63",
  measurementId: "G-LRLLD0M4K4",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const functions = getFunctions(app)

export default app
