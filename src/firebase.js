import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAomoYjwtvMRBuOMUW9xx3LQbvWyYGelSU",
  authDomain: "urgent-f1821.firebaseapp.com",
  projectId: "urgent-f1821",
  storageBucket: "urgent-f1821.appspot.com",
  messagingSenderId: "282346222751",
  appId: "1:282346222751:web:91b93abdc3cb4968ce5eaa",
  measurementId: "G-M6CMVZYP3E",
};

firebase.initializeApp(firebaseConfig);

// export const auth = firebase.auth();
// export const firestore = firebase.firestore();
export default firebase;
