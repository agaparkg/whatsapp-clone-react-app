import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AttachFile, InsertEmoticon, SearchOutlined } from '@material-ui/icons';
import { Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MicIcon from '@material-ui/icons/Mic';
import { onSnapshot, doc, db } from '../firebaseDB';
import '../styles/Chat.css';

export default function Chat() {
  const [seed, setSeed] = useState('');
  const [input, setInput] = useState('');
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState('');

  useEffect(() => {
    let unsubSingleDoc;
    if (roomId) {
      const singleDocRef = doc(db, 'rooms', roomId);
      unsubSingleDoc = onSnapshot(singleDocRef, (snapshot) => {
        setRoomName(snapshot.data().name);
      });
    }

    return () => {
      unsubSingleDoc();
    };
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();

    setInput('');
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__header-info">
          <h3>{roomName}</h3>
          <p>Last seen at...</p>
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
        <p className={`chat__message ${true && 'chat__receiver'}`}>
          <span className="chat__message-name">Azamat</span>
          Hey guys
          <span className="chat__message-timestamp">3:52pm</span>
        </p>
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
