import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA3c24KtBxxndxHCjT9rIvvme64ABpYqi4",
  authDomain: "tecemtf.firebaseapp.com",
  projectId: "tecemtf",
  storageBucket: "tecemtf.firebasestorage.app",
  messagingSenderId: "981549478614",
  appId: "1:981549478614:web:8c7075a5b8c1082a790f77",
  measurementId: "G-HDSY751DFV"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);