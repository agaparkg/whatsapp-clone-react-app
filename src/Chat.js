import { Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MicIcon from '@material-ui/icons/Mic';
import React, { useEffect, useState } from 'react';
import './Chat.css';
import { AttachFile, InsertEmoticon, SearchOutlined } from '@material-ui/icons';

export default function Chat() {
  const [seed, setSeed] = useState('');
  const [input, setInput] = useState('');

  useEffect(() => {
    setSeed(Math.floor(Math.random()*5000))
  }, [])

  const sendMessage = (e) => {
    e.preventDefault();

    setInput('')
  }
  return (
    <div className='chat'>
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
        <div className="chat__header-info">
          <h3>Room Name</h3>
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
          <span className='chat__message-name'>Azamat</span>
          Hey guys
          <span className="chat__message-timestamp">
            3:52pm
          </span>
        </p>
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input value={input} onChange={e => setInput(e.target.value)} placeholder='Type a message' type="text" />
          <button onClick={sendMessage}>Send a message</button>
        </form>
        <MicIcon />
      </div>
    </div>
  )
}
