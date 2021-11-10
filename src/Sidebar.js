import { Avatar, IconButton } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat';
import './Sidebar.css'
import { useState, useEffect } from 'react';
import db, { getRooms } from './firebaseDB';

function Sidebar() {
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    const data = async () => {
      const rooms = await getRooms(db);
      setRooms(rooms)
    }

    data();
  }, [])
  
  return (
    <div className="sidebar">
      {/* HEADER */}
      <div className="sidebar__header">
        <Avatar />
        <div className="sidebar__header-right">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      {/* SEARCH */}
      <div className="sidebar__search">
        <div className="sidebar__search-container">
          <SearchOutlined />
          <input type="text" placeholder="Search or start new chats" />
        </div>
      </div>

      {/* SIDEBAR CHATS */}
      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {
          rooms.map(room => {
            return <SidebarChat key={room.id} name={room.name} />
          })
        }
      </div>
    </div>
  )
}

export default Sidebar;