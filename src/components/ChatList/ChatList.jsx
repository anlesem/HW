import React from 'react';
import { NavLink } from 'react-router-dom';

import style from './ChatList.module.scss';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';

export const ChatList = ({ chats }) => {
   return (
      <div className={style.chatList}>Чаты:
         <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {chats.map((chat, idx) => (
               <ListItem
                  key={chat.id}
                  disableGutters
                  secondaryAction={
                     <NavLink to={`/chats/${chat.id}`} className={({ isActive }) => isActive ? style.active : ''}>
                        <IconButton>
                           <CommentIcon />
                        </IconButton>
                     </NavLink>
                  }
               >
                  <ListItemText primary={chat.name} data-testid={'chat-item-' + idx} />
               </ListItem>
            ))}
         </List>
      </div>
   );
};