// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDU3yhFfduc8SKROnoa-r75o7ktjo7UYtg",
  authDomain: "test-28015.firebaseapp.com",
  databaseURL: "https://test-28015-default-rtdb.firebaseio.com",
  projectId: "test-28015",
  storageBucket: "test-28015.appspot.com",
  messagingSenderId: "395512823241",
  appId: "1:395512823241:web:0c5fc450c780c724837c18",
  measurementId: "G-YD5MYC3QWD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
