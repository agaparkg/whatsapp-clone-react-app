import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './SidebarChat.css';
import { collectionRef, addDoc } from './firebaseDB';

export default function SidebarChat({ id, name, addNewChat }) {
  const [seed, setSeed] = useState('');

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
    <div className="sidebar-chat">
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
      <div className="sidebar-chat__info">
        <h2>{name}</h2>
        <p>Last message...</p>
      </div>
    </div>
  ) : (
    <div onClick={createChat} className="sidebar-chat">
      <h2>Add New Chat</h2>
    </div>
  );
  return content;
}
