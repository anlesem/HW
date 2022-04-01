import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import style from './MessageList.module.scss';

export const MessageList = ({ message }) => {
  const scrollMessages = useRef(null);

  useEffect(() => {
    scrollMessages.current.scrollTop =
      scrollMessages.current.scrollHeight - scrollMessages.current.clientHeight;
  });

  return (
    <ul className={style.messages} ref={scrollMessages}>
      {message &&
        message.map((item, idx) => {
          if (item) {
            return (
              <li key={idx} className={style.message} data-testid={'list-item-' + idx}>
                <p className={style.message_text}>{item.text}</p>
                <p className={style.message_author}>{item.author}</p>
              </li>
            );
          }
        })}
    </ul>
  );
};

MessageList.propTypes = {
  message: PropTypes.array.isRequired
};
