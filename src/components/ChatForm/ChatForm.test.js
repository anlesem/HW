import { render, screen, fireEvent } from '@testing-library/react';
import { ChatForm } from './ChatForm';

// import { Provider } from 'react-redux';
// import { store } from '../../store/store';

describe('ChatForm', () => {
  it('Компонент существует', () => {
    expect(ChatForm).toBeInstanceOf(Function);
  });

  it('Снимок состояния', () => {
    const changeNameChat = jest.fn();
    const checked = [];

    const { asFragment } = render(<ChatForm data={{ changeNameChat, checked }} />);
    expect(asFragment(<ChatForm />)).toMatchSnapshot();
  });

  it('Начало: Основное поле ввода пустое', () => {
    const changeNameChat = jest.fn();
    const checked = [];
    render(<ChatForm data={{ changeNameChat, checked }} />);

    const input = screen.getByTestId('chat-form-input');
    expect(input.value).toBe('');
  });

  it('Заполнение поле ввода', () => {
    const changeNameChat = jest.fn();
    const checked = [];
    render(<ChatForm data={{ changeNameChat, checked }} />);

    const input = screen.getByTestId('chat-form-input');

    fireEvent.change(input, { target: { value: 'bla-bla-bla' } });
    expect(input.value).toBe('bla-bla-bla');
  });

  it('Обработка клика на кнопку', () => {
    const changeNameChat = jest.fn();
    const checked = [];
    render(<ChatForm data={{ changeNameChat, checked }} />);

    const input = screen.getByTestId('chat-form-input');
    const button = screen.getByTestId('chat-form-button');

    fireEvent.change(input, { target: { value: 'bla-bla-bla' } });
    expect(input.value).toBe('bla-bla-bla');

    fireEvent.click(button);
    expect(changeNameChat).toBeCalled();
    expect(input.value).toBe('');
  });
});
