import app from 'firebase/app';
import firebase from 'firebase';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQ_BrS6jdWt0Vu65CDyyBfoAOo9_8-bag",
  authDomain: "prog-3-rn.firebaseapp.com",
  projectId: "prog-3-rn",
  storageBucket: "prog-3-rn.appspot.com",
  messagingSenderId: "27095177711",
  appId: "1:27095177711:web:9c49777db1745db6677e1a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);




export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();

