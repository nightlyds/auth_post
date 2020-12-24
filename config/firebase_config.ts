import firebase from "firebase";

export const config = {
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  databaseURL: '',
  apiKey: "",
  appId: "",
  measurementId: "",
};

const initFirebase = firebase.initializeApp(config);
export const db = initFirebase.firestore();