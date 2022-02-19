
import style from './Chats.module.scss';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';

export const Chats = (props) => {
   const users = props.message.filter(item => item.author !== 'BOT').reduce((acc, cur) => {
      const same = acc.find((element) => element.author === cur.author);
      if (!same) acc.push(cur);
      return acc;
   }, []);

   return (
      <div className={style.chats}>Чаты:
         <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {users.map((item) => (
               <ListItem
                  key={item.id}
                  disableGutters
                  secondaryAction={
                     <IconButton>
                        <CommentIcon />
                     </IconButton>
                  }
               >
                  <ListItemText primary={`Пользователь ${item.author}`} />
               </ListItem>
            ))}
         </List>
      </div>
   );
}