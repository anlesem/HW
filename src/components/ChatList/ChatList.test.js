import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { ChatList } from './ChatList';

import { Provider } from 'react-redux';
import { store } from '../../store/store';

describe('ChatList', () => {
  it('Компонент существует', () => {
    expect(ChatList).toBeInstanceOf(Function);
  });

  // it('Снимок состояния', () => {
  //   const chatId = 1;

  //   const { asFragment } = render(
  //     <Provider store={store}>
  //       <BrowserRouter>
  //         <ChatList chatData={chatId} />
  //       </BrowserRouter>
  //     </Provider>
  //   );
  //   expect(asFragment(<ChatList />)).toMatchSnapshot();
  // });

  it('Список чатов', () => {
    const chatId = 1;
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ChatList chatData={chatId} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByRole('list')).toBeTruthy();
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
  });
});
