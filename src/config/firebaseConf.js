import firebase, { initializeApp } from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDrjLGztzYkd9b8xeW4GY-VWBeNs2_skOE",
  authDomain: "simpleauth-4d7f4.firebaseapp.com",
  databaseURL: "https://simpleauth-4d7f4.firebaseio.com",
  projectId: "simpleauth-4d7f4",
  storageBucket: "simpleauth-4d7f4.appspot.com",
  messagingSenderId: "954310089663",
  appId: "1:954310089663:web:9b679e88102e1b999a9f0a",
  measurementId: "G-890BY6EDQ1"
};

const app = initializeApp(firebaseConfig);
const db = app.firestore();
firebase.analytics();

export { app, db };
