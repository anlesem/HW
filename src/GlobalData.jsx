import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import ChatBubbleTwoToneIcon from '@mui/icons-material/ChatBubbleTwoTone';
import CloudQueueTwoToneIcon from '@mui/icons-material/CloudQueueTwoTone';

const fontSize = 40;

export const GLOBAL = {
  lesson: 'Урок 8',
  user: 'User',
  bot: 'BOT',
  api: 'https://jsonplaceholder.typicode.com/posts?userId=1',
  navigate: [
    {
      id: 1,
      to: '/',
      name: 'Профиль',
      icon: <AccountCircleTwoToneIcon color="primary" sx={{ fontSize: fontSize }} />
    },
    {
      id: 2,
      to: '/chats',
      name: 'Чаты',
      icon: <ChatBubbleTwoToneIcon color="primary" sx={{ fontSize: fontSize }} />
    },
    {
      id: 3,
      to: '/data',
      name: 'Данные',
      icon: <CloudQueueTwoToneIcon color="primary" sx={{ fontSize: fontSize }} />
    }
  ]
};
