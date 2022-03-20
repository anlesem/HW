import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getProfileName } from '../../store/profile/selectors';
import { getChatList } from '../../store/chats/selectors';

import style from './Chats.module.scss';

import { ChatContain } from '../../components/ChatContain/ChatContain';
import { MessageContain } from '../../components/MessageContain/MessageContain';

export const Chats = () => {
  const navigate = useNavigate();

  const name = useSelector(getProfileName);
  const chats = useSelector(getChatList);
  const { chatId } = useParams();

  useEffect(() => {
    if (chats.findIndex((item) => item.id === +chatId) < 0) {
      navigate('/chats');
    }
  }, [chatId, chats, navigate]);

  return (
    <div className={style.main}>
      <div className={style.chats}>
        Чаты {name}:
        <ChatContain />
      </div>
      <div className={style.messages}>
        Сообщения:
        {chatId ? <MessageContain chatId={chatId} /> : <MessageContain chatId="0" />}
      </div>
    </div>
  );
};
