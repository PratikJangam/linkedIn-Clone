
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAj97BzfaIpVyGngEIkEOiuK2sfgMnYKsI",
    authDomain: "linkedin-clone-c82a4.firebaseapp.com",
    projectId: "linkedin-clone-c82a4",
    storageBucket: "linkedin-clone-c82a4.appspot.com",
    messagingSenderId: "380354398972",
    appId: "1:380354398972:web:6d85f243cb10c6815d6579"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();

  const auth = firebase.auth();

  export { db, auth };