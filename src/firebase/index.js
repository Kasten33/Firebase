// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOH2X_kP3iU4TMAFKeHpaEkND1jebQBSc",
  authDomain: "kasten-1d0e9.firebaseapp.com",
  projectId: "kasten-1d0e9",
  storageBucket: "kasten-1d0e9.appspot.com",
  messagingSenderId: "548491224987",
  appId: "1:548491224987:web:c4a2f7a84922fb31cae33e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
