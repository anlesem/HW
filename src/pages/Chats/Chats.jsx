import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getProfileName } from '../../store/profile/selectors';
import { getChatList } from '../../store/chats/selectors';

import style from './Chats.module.scss';

import { ChatList } from '../../components/ChatList/ChatList';
import { Messages } from '../../components/Messages/Messages';

export const Chats = () => {
  const navigate = useNavigate();

  const name = useSelector(getProfileName);
  const chats = useSelector(getChatList);
  const [chatIs, setChatIs] = useState(false);
  const { chatId } = useParams();

  useEffect(() => {
    if (chats.findIndex((item) => item.id === +chatId) < 0) {
      navigate('/chats');
    } else setChatIs(true);
  }, [chatId, chats, navigate]);

  return (
    <div className={style.main}>
      <div className={style.chats}>
        Чаты {name}:
        <ChatList chatId={chatId} />
      </div>
      <div className={style.messages}>
        Сообщения:
        {chatId && chatIs ? <Messages chatId={chatId} /> : <Messages chatId="0" />}
      </div>
    </div>
  );
};
