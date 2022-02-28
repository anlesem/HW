import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';


import { MessageList } from '../../components/MessageList/MessageList';
import { Form } from '../../components/Form/Form';

import style from './Chats.module.scss';

// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import IconButton from '@mui/material/IconButton';
// import CommentIcon from '@mui/icons-material/Comment';

const defaultMessages = {
   chat1: [
      {
         id: '1',
         author: 'Geekbrains',
         text: 'Welcome to the chat',
      },
   ],
   chat2: [
      {
         id: '2',
         author: 'Geekbrains',
         text: 'Welcome to the chat',
      },
   ],
   chat3: [
      {
         id: '3',
         author: 'Geekbrains',
         text: 'Welcome to the chat',
      },
   ],
};

// const chats = [
//    {
//       id: '1',
//       name: 'чат 1',
//    },
//    {
//       id: '2',
//       name: 'чат 2',
//    },
//    {
//       id: '3',
//       name: 'чат 3',
//    },
// ];

// export default function Chats() {
export const Chats = () => {
   const [messages, setMessages] = useState(defaultMessages);

   const sendMassage = (author, text) => {
      if (author || text) {
         setMessages((prevMessages) => [...prevMessages, {
            id: nanoid(),
            author: author,
            text: text,
         }]);
      }
   }

   useEffect(() => {
      if (messages.length && messages[messages.length - 1].author !== 'BOT') {
         const timeout = setTimeout(
            () =>
               sendMassage('BOT', 'Im BOT'),
            1000
         );

         return () => {
            clearTimeout(timeout);
         };
      }
   }, [messages]);

   return (
      <div className={style.chats}>Чаты:
         {/* <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {messages.map((item, idx) => (
               <ListItem
                  key={item.id}
                  disableGutters
                  secondaryAction={
                     <IconButton>
                        <CommentIcon />
                     </IconButton>
                  }
               >
                  <ListItemText primary={`Пользователь ${item.author}`} data-testid={'chat-item-' + idx} />
               </ListItem>
            ))}
         </List> */}
         <Form addMessage={sendMassage} />
         <MessageList message={messages} />
      </div>
   );
}