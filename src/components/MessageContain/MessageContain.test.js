import { render } from '@testing-library/react';
import { MessageContain } from './MessageContain';

import { Provider } from 'react-redux';
import { store } from '../../store/store';

describe('MessageContain', () => {
  it('Компонент существует', () => {
    expect(MessageContain).toBeInstanceOf(Function);
  });

  it('Снимок состояния', () => {
    const chatId = '1';
    const { asFragment } = render(
      <Provider store={store}>
        <MessageContain chatId={chatId} />
      </Provider>
    );
    expect(asFragment(<MessageContain chatId={chatId} />)).toMatchSnapshot();
  });
});
