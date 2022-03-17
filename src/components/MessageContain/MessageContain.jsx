import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getMessageList } from '../../store/messages/selectors';
import { addMessage } from '../../store/messages/actions';

import { MessageList } from '../MessageList/MessageList';
import { MessageForm } from '../MessageForm/MessageForm';

import style from './MessageContain.module.scss';

export const MessageContain = ({ chatId }) => {
  const dispatch = useDispatch();
  const messages = useSelector(getMessageList);

  const sendMassage = (text, author, id) => {
    dispatch(addMessage(chatId, text, author, id));
  };

  useEffect(() => {
    if (
      messages[`chat${chatId}`] &&
      messages[`chat${chatId}`][messages[`chat${chatId}`].length - 1].author !== 'BOT'
    ) {
      const timeout = setTimeout(() => sendMassage('Im BOT', 'BOT'), 1000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [messages, sendMassage]);

  return (
    <div className={style.wrap}>
      <MessageList message={messages[`chat${chatId}`]} />
      <MessageForm formData={{ chatId, sendMassage }} />
    </div>
  );
};
