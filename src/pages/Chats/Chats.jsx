import { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
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
   const { chatId } = useParams('1');


   const sendMassage = (author, text) => {
      if (author || text) {
         setMessages((prevMessages) => [...prevMessages[`chat${chatId}`], {
            id: nanoid(),
            author: author,
            text: text,
         }]);
      }
   }

   // useEffect(() => {
   //    // console.log(messages[`chat${chatId}`]);

   //    if (messages[`chat${chatId}`].length && messages[`chat${chatId}`][messages[`chat${chatId}`].length - 1].author !== 'BOT') {
   //       const timeout = setTimeout(
   //          () =>
   //             sendMassage('BOT', 'Im BOT'),
   //          1000
   //       );

   //       return () => {
   //          clearTimeout(timeout);
   //       };
   //    }
   // }, [messages]);

   // if (!messages[`chat${chatId}`]) {
   //    return <Redirect to="/" />;
   // }

   return (
      <div className={style.chats}>
         <ChatList chats={chats} />
         <Form addMessage={sendMassage} />
         <MessageList message={chatId ? messages[`chat${chatId}`] : []} />
      </div>
   );
}