import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-e7059.firebaseapp.com",
  projectId: "real-estate-e7059",
  storageBucket: "real-estate-e7059.appspot.com",
  messagingSenderId: "836157835252",
  appId: "1:836157835252:web:38df562c78e2fa34105ba1",
};

export const app = initializeApp(firebaseConfig);
