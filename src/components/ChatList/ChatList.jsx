import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import style from './ChatList.module.scss';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';

export const ChatList = ({ data }) => {
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      className={style.chatList}
      ref={data.scrollChats}>
      {data.chats.map((chat) => {
        const labelId = `checkbox-list-label-${chat.id}`;
        return (
          <ListItem
            key={chat.id}
            secondaryAction={
              <NavLink
                to={`/chats/${chat.id}`}
                className={({ isActive }) => (isActive ? style.active : '')}>
                <IconButton edge="end" aria-label="comments" data-testid={'chat-change-' + chat.id}>
                  <CommentIcon />
                </IconButton>
              </NavLink>
            }
            disablePadding>
            <ListItemButton
              role={undefined}
              onClick={data.handleToggle(chat.id)}
              dense
              data-testid={'chat-item-' + chat.id}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={data.checked.indexOf(chat.id) !== -1}
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
  );
};

ChatList.propTypes = {
  data: PropTypes.shape({
    chats: PropTypes.array.isRequired,
    checked: PropTypes.array.isRequired,
    handleToggle: PropTypes.func.isRequired,
    scrollChats: PropTypes.object
  })
};
