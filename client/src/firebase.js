import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCn_WY_AlV6KlqqpJYA0VVLO5sqM02kc6Y",
  authDomain: "takebook-54d32.firebaseapp.com",
  projectId: "takebook-54d32",
  storageBucket: "takebook-54d32.appspot.com",
  messagingSenderId: "735756507181",
  appId: "1:735756507181:web:39a5e019c98ba1547900a4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;