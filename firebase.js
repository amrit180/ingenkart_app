// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPpNI2sxiE423wxr7BbaB8nlU3uEda2o8",
  authDomain: "the-yellow-box.firebaseapp.com",
  projectId: "the-yellow-box",
  storageBucket: "the-yellow-box.appspot.com",
  messagingSenderId: "1009170810242",
  appId: "1:1009170810242:web:f9f64e71a238ca1dad3b9b",
  measurementId: "G-1BGJ820TB6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const storage = getStorage(app);
export const db = getFirestore(app);
