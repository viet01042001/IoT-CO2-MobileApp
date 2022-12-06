import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCejL2VuPZk6C5eg2-yn9bUm7PyuxElO0s",
  authDomain: "iot-co2-729a7.firebaseapp.com",
  databaseURL: "https://iot-co2-729a7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "iot-co2-729a7",
  storageBucket: "iot-co2-729a7.appspot.com",
  messagingSenderId: "205183662339",
  appId: "1:205183662339:web:387109c9853ca0a6b05136",
  measurementId: "G-0R75QSWTK9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);