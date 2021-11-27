import { Link } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import '../styles/SidebarChat.css';
import { collectionRef, db } from '../firebaseDB';
import {
  collection,
  query,
  addDoc,
  onSnapshot,
  orderBy
} from 'firebase/firestore';

export default function SidebarChat({ id, name, addNewChat }) {
  const [seed, setSeed] = useState('');
  const [messages, setMessages] = useState('');

  useEffect(() => {
    let unsubMessages;

    if (id) {
      const messagesRef = collection(db, 'rooms/' + id + '/messages');
      const messagesQuery = query(messagesRef, orderBy('timestamp', 'desc'));
      unsubMessages = onSnapshot(
        messagesQuery,
        (snapshot) => {
          console.log(
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
          setMessages(
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
        },
        (error) => {
          console.log(error);
        }
      );
    }
    return () => {
      unsubMessages();
    };
  }, [id]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt('Please enter name for chat');

    if (roomName) {
      addDoc(collectionRef, {
        name: roomName
      }).then(() => {
        console.log('successfully added new chat room');
      });
    }
  };

  let content = !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebar-chat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebar-chat__info">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebar-chat">
      <h2>Add New Chat</h2>
    </div>
  );
  return content;
}
