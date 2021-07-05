import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCBPb5QLzUMqoZW-U7rsL0v-9V-4ojBXDA",
  authDomain: "linkedin-clone-84109.firebaseapp.com",
  projectId: "linkedin-clone-84109",
  storageBucket: "linkedin-clone-84109.appspot.com",
  messagingSenderId: "371638177571",
  appId: "1:371638177571:web:110946e7856146b45a4696"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };