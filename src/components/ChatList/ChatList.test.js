import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { ChatList } from './ChatList';

describe('ChatList', () => {
  it('Компонент существует', () => {
    expect(ChatList).toBeInstanceOf(Function);
  });

  it('Снимок состояния', () => {
    const handleToggle = jest.fn();
    const chats = [
      {
        id: 1,
        name: 'чат 1'
      }
    ];
    const checked = [];
    const scrollChats = null;

    const { asFragment } = render(
      <BrowserRouter>
        <ChatList data={{ handleToggle, chats, checked, scrollChats }} />
      </BrowserRouter>
    );
    expect(asFragment(<ChatList />)).toMatchSnapshot();
  });

  it('Сформированный список чатов', () => {
    const handleToggle = jest.fn();
    const chats = [
      {
        id: 1,
        name: 'чат 1'
      }
    ];
    const checked = [];
    const scrollChats = null;

    render(
      <BrowserRouter>
        <ChatList data={{ handleToggle, chats, checked, scrollChats }} />
      </BrowserRouter>
    );

    expect(screen.getByRole('listitem')).toBeTruthy();
    expect(screen.getByText(/чат/)).toBeTruthy();
  });
});
