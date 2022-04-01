import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { getCounterMSG, getMessageList } from '../../store/messages/selectors';
import { addMessageThunk } from '../../store/messages/actions';

import { MessageList } from '../MessageList/MessageList';
import { MessageForm } from '../MessageForm/MessageForm';

import style from './MessageContain.module.scss';
import { getProfileName } from '../../store/profile/selectors';

export const MessageContain = ({ chatId }) => {
  const dispatch = useDispatch();
  const messages = useSelector(getMessageList);
  const name = useSelector(getProfileName);
  const counter = useSelector(getCounterMSG);

  const sendMassage = useCallback(
    (text) => {
      let counterMSG = counter[chatId];
      dispatch(addMessageThunk({ chatId, text, name, counterMSG }));
    },
    [chatId, dispatch, counter]
  );

  return (
    <div className={style.wrap}>
      {messages[chatId] && <MessageList message={messages[chatId]} />}
      {messages[chatId] && <MessageForm data={{ chatId, sendMassage }} />}
    </div>
  );
};

MessageContain.propTypes = {
  chatId: PropTypes.string.isRequired
};
