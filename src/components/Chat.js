import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AttachFile, InsertEmoticon, SearchOutlined } from '@material-ui/icons';
import { Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MicIcon from '@material-ui/icons/Mic';
import { db } from '../firebaseDB';
import '../styles/Chat.css';
import {
  orderBy,
  query,
  collection,
  addDoc,
  doc,
  serverTimestamp,
  onSnapshot
} from '@firebase/firestore';
import { useStateValue } from '../StateProvider';

export default function Chat() {
  const [seed, setSeed] = useState('');
  const [input, setInput] = useState('');
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState('');
  const [messages, setMessages] = useState([]);
  const [{ user }] = useStateValue();

  useEffect(() => {
    let unsubSingleDoc;
    let unsubMessages;
    if (roomId) {
      const singleDocRef = doc(db, 'rooms', roomId);
      unsubSingleDoc = onSnapshot(singleDocRef, (snapshot) => {
        setRoomName(snapshot.data().name);
      });

      const messagesRef = collection(db, 'rooms/' + roomId + '/messages');
      const messagesQuery = query(messagesRef, orderBy('timestamp', 'asc'));
      unsubMessages = onSnapshot(
        messagesQuery,
        (snapshot) => {
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
      unsubSingleDoc();
      unsubMessages();
    };
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();

    const messagesRef = collection(db, 'rooms/' + roomId + '/messages');
    addDoc(messagesRef, {
      message: input,
      name: user.displayName,
      timestamp: serverTimestamp()
    }).then(() => {
      console.log('successfully added new message');
    });
    setInput('');
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__header-info">
          <h3>{roomName}</h3>
          <p>
            Last seen at{' '}
            {new Date(
              messages[messages?.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className="chat__header-right">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message) => {
          const msgClass = user.displayName === message.name;

          return (
            <p
              key={message.id}
              className={`chat__message ${msgClass && 'chat__receiver'}`}
            >
              <span className="chat__message-name">{message.name}</span>
              {message.message}
              <span className="chat__message-timestamp">
                {new Date(message.timestamp?.toDate()).toUTCString()}
              </span>
            </p>
          );
        })}
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage}>Send a message</button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}
