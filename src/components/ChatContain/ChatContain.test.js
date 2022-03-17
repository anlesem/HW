import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { ChatContain } from './ChatContain';

import { Provider } from 'react-redux';
import { store } from '../../store/store';

describe('ChatContain', () => {
  it('Компонент существует', () => {
    expect(ChatContain).toBeInstanceOf(Function);
  });

  it('Снимок состояния', () => {
    const chatId = 1;

    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <ChatContain chatData={chatId} />
        </BrowserRouter>
      </Provider>
    );
    expect(asFragment(<ChatContain />)).toMatchSnapshot();
  });

  it('Список чатов', () => {
    const chatId = 1;
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ChatContain chatData={chatId} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByRole('list')).toBeTruthy();
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
  });
});
