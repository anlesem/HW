import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getChatList, getChatCounter } from '../../store/chats/selectors';
import {
  addChatThunk,
  renameChatThunk,
  deleteChatThunk,
  initChatsDataThunk
} from '../../store/chats/actions';
import { initMessageList, initTempInput } from '../../store/messages/actions';

import style from './ChatContain.module.scss';

import { ChatList } from '../ChatList/ChatList';
import { ChatButtons } from '../ChatButtons/ChatButtons';
import { ChatForm } from '../ChatForm/ChatForm';

export const ChatContain = () => {
  const dispatch = useDispatch();
  const chats = useSelector(getChatList);
  const counter = useSelector(getChatCounter);
  const [checked, setChecked] = useState([0]);
  const scrollChats = useRef(null);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const handleAdd = () => {
    dispatch(addChatThunk(counter + 1));
    dispatch(initMessageList(counter + 1));
    dispatch(initTempInput);
    scrollChats.current.scrollTop =
      scrollChats.current.scrollHeight - scrollChats.current.clientHeight;
  };

  const handleDelete = (checked) => {
    checked.forEach((id) => {
      dispatch(deleteChatThunk(id));
    });
    setChecked([0]);
  };

  const changeNameChat = (text) => {
    dispatch(renameChatThunk(checked[1], text));
    setChecked([0]);
  };

  useEffect(() => {
    dispatch(initChatsDataThunk());
  }, []);

  return (
    <div className={style.wrap}>
      <ChatList data={{ handleToggle, chats, checked, scrollChats }} />
      <ChatButtons data={{ handleAdd, handleDelete, checked }} />
      {checked.length === 2 && <ChatForm data={{ changeNameChat, checked }} />}
    </div>
  );
};
