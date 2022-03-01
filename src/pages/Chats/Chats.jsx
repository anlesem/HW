import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';

import { ChatList } from '../../components/ChatList/ChatList';
import { MessageList } from '../../components/MessageList/MessageList';
import { Form } from '../../components/Form/Form';

import style from './Chats.module.scss';

const defaultMessages = {
   chat1: [
      {
         id: '1',
         author: 'BOT',
         text: 'Добро пожаловать в чат №1',
      },
   ],
   chat2: [
      {
         id: '1',
         author: 'BOT',
         text: 'Добро пожаловать в чат №2',
      },
   ],
   chat3: [
      {
         id: '1',
         author: 'BOT',
         text: 'Добро пожаловать в чат №3',
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
   const { chatId } = useParams();
   const navigate = useNavigate();

   const sendMassage = useCallback((text, author = 'User') => {
      if (text) {
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
      let number = null;
      if (chats.length) number = +chats[chats.length - 1].id + 1;
      else number = 1;
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
            text: `Добро пожаловать в чат №${number}`,
         }],
      }));
   }

   const removeChat = (id) => {
      let index = chats.findIndex(item => item.id === `${id}`);
      setChats([...chats.slice(0, index), ...chats.slice(index + 1)]);
   }

   useEffect(() => {
      let index = chats.findIndex(item => item.id === `${chatId}`);
      if (index < 0) {
         navigate("/chats");
      }
      if (index > 0 && messages[`chat${chatId}`][messages[`chat${chatId}`].length - 1].author !== 'BOT') {
         const timeout = setTimeout(
            () =>
               sendMassage('Im BOT', 'BOT'),
            1000
         );

         return () => {
            clearTimeout(timeout);
         };
      }
   }, [chatId, chats, messages, navigate, sendMassage]);

   return (
      <div className={style.main}>
         <ChatList chatData={{ chatId, chats, addChat, removeChat }} />
         <div className={style.messages}>Сообщения:
            <Form formData={{ chatId, sendMassage }} />
            <MessageList message={messages[`chat${chatId}`]} />
         </div>
      </div>
   );
}