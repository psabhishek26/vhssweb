import { initializeApp } from "firebase/app";

import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FB_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FB_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FB_APP_ID,
  measurementId: process.env.REACT_APP_FB_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
export const dataRef = firebase.database();
export const storage = firebase.storage().ref();
export default firebase;