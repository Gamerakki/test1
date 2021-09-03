// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDV7Hd1Nug6Yu3QY-wwKq7X4A2QH6H1ZQ",
  authDomain: "friendlistproject-9c522.firebaseapp.com",
  projectId: "friendlistproject-9c522",
  storageBucket: "friendlistproject-9c522.appspot.com",
  messagingSenderId: "373191148843",
  appId: "1:373191148843:web:e92e6163fd4506bef5f16e",
  measurementId: "G-F6LRGNC0XW"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);

export default firebase;
