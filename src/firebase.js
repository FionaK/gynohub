// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDE3E4B2yz62xMN3Pd1R97_d5_47t2N1B0",
  authDomain: "gynohub.firebaseapp.com",
  projectId: "gynohub",
  storageBucket: "gynohub.appspot.com",
  messagingSenderId: "947386795677",
  appId: "1:947386795677:web:3b856ed335942f24443674"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
