import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { ChatList } from '../../components/ChatList/ChatList';
import { Message } from '../../components/Message/Message';

import style from './Chats.module.scss';

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

export const Chats = () => {
   const [chats, setChats] = useState(defaultChats);
   const [counterId, setCounterId] = useState(chats.length);
   const [chatIs, setChatIs] = useState(false);
   const { chatId } = useParams();
   const navigate = useNavigate();

   const addChat = useCallback(() => {
      setChats((prevChats) => ([
         ...prevChats, {
            id: `${counterId + 1}`,
            name: `чат ${counterId + 1}`,
         },
      ]));
      setCounterId(counterId + 1);
   }, [counterId])

   const removeChat = useCallback((id) => {
      setChats(chats.filter(item => item.id !== `${id}`));
   }, [chats])

   useEffect(() => {
      if (chats.length === 0) addChat();
   }, [addChat, chats, removeChat]);

   useEffect(() => {
      if (chats.findIndex(item => item.id === `${chatId}`) < 0) {
         navigate("/chats");
      } else setChatIs(true);
   }, [chatId, chats, navigate]);

   return (
      <div className={style.main}>
         <ChatList chatData={{ chatId, chats, addChat, removeChat }} />
         {chatId && chatIs ? <Message chatId={chatId} /> : <Message chatId="0" />}
      </div>
   );
}