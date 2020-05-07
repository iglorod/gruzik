import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';

const firebaseConfig = ({
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_KEY_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_KEY_STORE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_KEY_SENDER_ID,
});

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export default app;
