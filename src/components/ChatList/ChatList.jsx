import { NavLink } from 'react-router-dom';
import { useEffect, useRef } from 'react';

import style from './ChatList.module.scss';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export const ChatList = ({ chatData }) => {
   const scrollChats = useRef(null);

   useEffect(() => {
      scrollChats.current.scrollTop = scrollChats.current.scrollHeight - scrollChats.current.clientHeight;
   });

   return (
      <div className={style.chatList} ref={scrollChats}>Чаты:
         <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {chatData.chats.map((chat) => (
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
                  <ListItemText primary={chat.name} data-testid={'chat-item-' + chat.id} />
               </ListItem>
            ))}
         </List>
         <Stack direction="row" spacing={2} className={style.chatManage}>
            <Button
               variant="outlined"
               startIcon={<DeleteIcon />}
               disabled={chatData.chatId ? false : true}
               data-testid="chats-button-remove"
               onClick={() => chatData.removeChat(chatData.chatId)}
            >
               Удалить
            </Button>
            <Button
               variant="outlined"
               startIcon={<AddIcon />}
               data-testid="chats-button-add"
               onClick={() => chatData.addChat()}>
               Добавить
            </Button>
         </Stack>
      </div>
   );
};