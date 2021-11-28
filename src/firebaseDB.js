import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBIOGmaDX8CyJ-1Sl9ZLK5Gd3oaGoE14MI',
  authDomain: 'whatsapp-clone-2021-b5316.firebaseapp.com',
  databaseURL: 'https://whatsapp-clone-2021-b5316-default-rtdb.firebaseio.com',
  projectId: 'whatsapp-clone-2021-b5316',
  storageBucket: 'whatsapp-clone-2021-b5316.appspot.com',
  messagingSenderId: '572711420778',
  appId: '1:572711420778:web:c5684cda268e4767401b13',
  measurementId: 'G-EY9EXKBZ9P'
};

// initialize firebase app
initializeApp(firebaseConfig);

// initialize services
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();
// collection ref - reference to all documents in the database
const collectionRef = collection(db, 'rooms');

export { collectionRef, db, provider, auth };
