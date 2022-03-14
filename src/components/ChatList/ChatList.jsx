import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getChatList, getChatCounter } from '../../store/chats/selectors';
import { addChat, renameChat, deleteChat } from '../../store/chats/actions';
import { initMessageList, initTempInput } from '../../store/messages/actions';

import style from './ChatList.module.scss';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';

export const ChatList = () => {
  const dispatch = useDispatch();

  const chats = useSelector(getChatList);
  const counter = useSelector(getChatCounter);
  const [text, setText] = useState('');
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
    dispatch(addChat);
    dispatch(initMessageList(counter + 1));
    dispatch(initTempInput);
    scrollChats.current.scrollTop =
      scrollChats.current.scrollHeight - scrollChats.current.clientHeight;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (text) {
      dispatch(renameChat(checked[1], text));
      setText('');
      setChecked([0]);
    }
  };

  const handleDelete = (checked) => {
    checked.forEach((id) => {
      dispatch(deleteChat(id));
    });
    setChecked([0]);
  };

  const handleInput = (value) => {
    setText(value);
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  useEffect(() => {
    setText('');
  }, [checked]);

  return (
    <div className={style.wrap}>
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        className={style.chatList}
        ref={scrollChats}>
        {chats.map((chat) => {
          const labelId = `checkbox-list-label-${chat.id}`;
          return (
            <ListItem
              key={chat.id}
              secondaryAction={
                <NavLink
                  to={`/chats/${chat.id}`}
                  className={({ isActive }) => (isActive ? style.active : '')}>
                  <IconButton
                    edge="end"
                    aria-label="comments"
                    data-testid={'chat-change-' + chat.id}>
                    <CommentIcon />
                  </IconButton>
                </NavLink>
              }
              disablePadding>
              <ListItemButton
                role={undefined}
                onClick={handleToggle(chat.id)}
                dense
                data-testid={'chat-item-' + chat.id}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(chat.id) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{
                      'aria-labelledby': labelId,
                      'data-testid': `chat-check-${chat.id}`
                    }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={chat.name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Stack direction="row" spacing={2} className={style.manage}>
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          disabled={checked.length > 1 ? false : true}
          data-testid="chats-button-remove"
          onClick={() => handleDelete(checked)}>
          Удалить
        </Button>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          data-testid="chats-button-add"
          onClick={() => handleAdd(checked)}>
          Добавить
        </Button>
      </Stack>
      {checked.length === 2 && (
        <form className={style.rename} onSubmit={handleSubmit}>
          <TextField
            id="outlined-basic"
            name="chat"
            label="Название чата"
            variant="outlined"
            value={text}
            onChange={(event) => handleInput(event.target.value)}
            onKeyDown={(event) => handleKeyDown(event)}
            required
            inputProps={{ 'data-testid': 'chat-form-input' }}
            className={style.textField}
          />
          <Button variant="outlined" type="submit" data-testid="chat-form-button">
            <SendIcon />
          </Button>
        </form>
      )}
    </div>
  );
};
