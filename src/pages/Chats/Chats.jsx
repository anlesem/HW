import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';


import { ChatList } from '../../components/ChatList/ChatList';
import { ChatManager } from '../../components/ChatManager/ChatManager';
import { MessageList } from '../../components/MessageList/MessageList';
import { Form } from '../../components/Form/Form';

import style from './Chats.module.scss';

const defaultMessages = {
   chat1: [
      {
         id: '1',
         author: 'BOT',
         text: 'Добро пожаловать в чат',
      },
   ],
   chat2: [
      {
         id: '1',
         author: 'BOT',
         text: 'Добро пожаловать в чат',
      },
   ],
   chat3: [
      {
         id: '1',
         author: 'BOT',
         text: 'Добро пожаловать в чат',
      },
   ],
};

const defaultChats = [
   {
      id: '1',
      name: 'чат 1',
   },
   {
      id: '2',
      name: 'чат 2',
   },
   {
      id: '3',
      name: 'чат 3',
   },
];

// export default function Chats() {
export const Chats = () => {
   const [messages, setMessages] = useState(defaultMessages);
   const [chats, setChats] = useState(defaultChats);
   const navigate = useNavigate();
   const { chatId } = useParams();

   const sendMassage = useCallback((author, text) => {
      if (author || text) {
         setMessages((prevMessages) => ({
            ...prevMessages,
            [`chat${chatId}`]: [...prevMessages[`chat${chatId}`], {
               id: nanoid(),
               author: author,
               text: text,
            }],
         }));
      }
   }, [chatId]);

   const addChat = () => {
      let number = chats.length + 1;

      setChats((chats) => ([
         ...chats, {
            id: `${number}`,
            name: `чат ${number}`,
         },
      ]));
      setMessages((prevMessages) => ({
         ...prevMessages,
         [`chat${number}`]: [{
            id: '1',
            author: 'BOT',
            text: 'Добро пожаловать в чат',
         }],
      }));
   }

   useEffect(() => {
      if (!messages[`chat${chatId}`]) {
         return navigate("/chats");
      }

      if (messages[`chat${chatId}`].length && messages[`chat${chatId}`][messages[`chat${chatId}`].length - 1].author !== 'BOT') {
         const timeout = setTimeout(
            () =>
               sendMassage('BOT', 'Im BOT'),
            1000
         );

         return () => {
            clearTimeout(timeout);
         };
      }
   }, [chatId, messages, navigate, sendMassage]);

   return (
      <div className={style.main}>
         <div className={style.chats}>
            <ChatList chats={chats} />
            <ChatManager addChat={addChat} />
         </div>
         <Form addMessage={sendMassage} />
         <MessageList message={chatId && messages[`chat${chatId}`] ? messages[`chat${chatId}`] : []} />
      </div>
   );
}