import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { ChatList } from './ChatList';

describe('ChatList', () => {
   it('Компонент существует', () => {
      expect(ChatList).toBeInstanceOf(Function);
   });

   it('Снимок состояния', () => {
      const chatId = 1;
      const chats = [{
         id: '1',
         name: 'чат 1',
      },
      {
         id: '2',
         name: 'чат 2',
      },];
      const { asFragment } = render(<BrowserRouter>
         <ChatList chatData={{ chatId, chats }} />
      </BrowserRouter>);
      expect(asFragment(<ChatList />)).toMatchSnapshot();
   });

   it('Список чатов', () => {
      const chatId = 1;
      const chats = [{
         id: '1',
         name: 'чат 1',
      },
      {
         id: '2',
         name: 'чат 2',
      },];

      render(<BrowserRouter>
         <ChatList chatData={{ chatId, chats }} />
      </BrowserRouter>);

      expect(screen.getByRole('list')).toBeTruthy();
      expect(screen.getAllByRole('listitem')).toHaveLength(2);
   });
});