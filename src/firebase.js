// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZJyYFxpeLnk0NDwLgdgviELIbofOu_ZE",
  authDomain: "front-quiz-3cd1d.firebaseapp.com",
  projectId: "front-quiz-3cd1d",
  storageBucket: "front-quiz-3cd1d.appspot.com",
  messagingSenderId: "731043815607",
  appId: "1:731043815607:web:7fd0e1c23e73d61761ed32",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
