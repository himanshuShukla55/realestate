import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-e7059.firebaseapp.com",
  projectId: "real-estate-e7059",
  storageBucket: "real-estate-e7059.appspot.com",
  messagingSenderId: "836157835252",
  appId: "1:836157835252:web:38df562c78e2fa34105ba1",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const storage = getStorage(app);

const googleProvider = new GoogleAuthProvider();

export const authenticateWithGoogle = () =>
  signInWithPopup(auth, googleProvider);

export const handleFileUpload = (
  file,
  setFilePercentage,
  setFileUploadError,
  setFormData
) => {
  const fileName = new Date().getTime() + file.name;
  const storageRef = ref(storage, fileName);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setFilePercentage(Math.round(progress));
    },
    (error) => setFileUploadError(true),
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setFormData((prev) => {
          return { ...prev, avatar: downloadURL };
        });
      });
    }
  );
};
