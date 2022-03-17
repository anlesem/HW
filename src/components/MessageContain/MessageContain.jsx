import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getMessageList } from '../../store/messages/selectors';
import { addMessageThunk } from '../../store/messages/actions';

import { MessageList } from '../MessageList/MessageList';
import { MessageForm } from '../MessageForm/MessageForm';

import style from './MessageContain.module.scss';

export const MessageContain = ({ chatId }) => {
  const dispatch = useDispatch();
  const messages = useSelector(getMessageList);

  const sendMassage = useCallback(
    (text, author, id) => {
      dispatch(addMessageThunk({ chatId, text, author, id }));
    },
    [chatId, dispatch]
  );

  return (
    <div className={style.wrap}>
      <MessageList message={messages[`chat${chatId}`]} />
      <MessageForm formData={{ chatId, sendMassage }} />
    </div>
  );
};
