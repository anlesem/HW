import { render, screen } from '@testing-library/react';
import { MessageList } from './MessageList';

describe('MessageList', () => {
  it('Компонент существует', () => {
    expect(MessageList).toBeInstanceOf(Function);
  });

  it('Снимок состояния', () => {
    const message = [
      {
        id: 1,
        author: 'somebody',
        text: 'some text'
      }
    ];
    const { asFragment } = render(<MessageList message={message} />);
    expect(asFragment(<MessageList />)).toMatchSnapshot();
  });

  it('Изначально список сообщений существует, но пустой', () => {
    const message = [];
    render(<MessageList message={message} />);

    expect(screen.getByRole('list')).toBeTruthy();
    expect(screen.queryByRole('listitem')).toBeFalsy();
  });

  it('Сформированный список сообщений', () => {
    const message = [
      {
        id: 1,
        author: 'somebody',
        text: 'some text'
      }
    ];
    render(<MessageList message={message} />);

    expect(screen.getByRole('listitem')).toBeTruthy();
    expect(screen.getByText(/somebody/)).toBeTruthy();
    expect(screen.getByText('some text')).toBeTruthy();
  });
});
