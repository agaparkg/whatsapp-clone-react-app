// https://firebase.google.com/docs/firestore/manage-data/add-data
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyBIOGmaDX8CyJ-1Sl9ZLK5Gd3oaGoE14MI",
  authDomain: "whatsapp-clone-2021-b5316.firebaseapp.com",
  projectId: "whatsapp-clone-2021-b5316",
  storageBucket: "whatsapp-clone-2021-b5316.appspot.com",
  messagingSenderId: "572711420778",
  appId: "1:572711420778:web:c5684cda268e4767401b13",
  measurementId: "G-EY9EXKBZ9P"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getRooms(db) {
  const roomsCol = collection(db, 'rooms');
  const roomSnapshot = await getDocs(roomsCol);
  const roomList = roomSnapshot.docs.map(doc => doc.data());
  return roomList;
}

// Add a new document in collection "rooms"
async function setNewRoomName(roomName) {
  const roomRef = collection(db, "rooms")
  await addDoc(roomRef, {
    name: roomName,
  });
}

export { getRooms, setNewRoomName }
export default db;