import firebase from "firebase/app";
import "firebase/auth";
import "firebase/fireStore";
import "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFe-kj-YFOLTd6DhQK4gq50Fn39nU4dlQ",
  authDomain: "audioclub-74c06.firebaseapp.com",
  projectId: "audioclub-74c06",
  storageBucket: "audioclub-74c06.appspot.com",
  messagingSenderId: "113704287136",
  appId: "1:113704287136:web:eb861960f0b14ef6bb82c5",
};

// Initilaize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Kepp copy of the DB in the user browser
db.enablePersistence().catch((error) => {
  console.log(`Firebase persistence error ${error.code}`);
});

const usersCollection = db.collection("users");
const audiosCollection = db.collection("audios");
const commentsCollection = db.collection("comments");

export {
  auth,
  db,
  storage,
  usersCollection,
  audiosCollection,
  commentsCollection,
};
