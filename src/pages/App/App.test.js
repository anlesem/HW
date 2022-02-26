import { render, screen, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('Компонент существует', () => {
    expect(App).toBeInstanceOf(Function);
  });

  it('Тег main существует (большой выбор ролей)', () => {
    render(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('При клике на кнопку в Форме содержимое Списка сообщений и Чата меняется', () => {
    render(<App />);
    // screen.debug(); - снимок

    const input = screen.getByTestId('form-inputAuthor');
    const button = screen.getByTestId('form-button');

    // Добавление первого сообщения. Список сообщений и Чат меняются
    fireEvent.change(input, { target: { value: 'User' } });
    expect(input.value).toBe('User');
    fireEvent.click(button);
    expect(screen.getByText('User')).toBeTruthy();
    expect(screen.getByTestId('list-item-0')).toBeTruthy();
    expect(screen.getByTestId('chat-item-0')).toBeTruthy();

    // Добавление нового сообщения существующего пользователя. Список сообщений меняется, а Чат нет
    fireEvent.change(input, { target: { value: 'User' } });
    expect(input.value).toBe('User');
    fireEvent.click(button);
    expect(screen.getByTestId('list-item-1')).toBeTruthy();
    expect(screen.queryByTestId('chat-item-1')).not.toBeInTheDocument();

    // Добавление нового сообщения от нового пользователя. Список сообщений и Чат меняются
    fireEvent.change(input, { target: { value: 'another' } });
    expect(input.value).toBe('another');
    fireEvent.click(button);
    expect(screen.getByText('another')).toBeTruthy();
    expect(screen.getByTestId('list-item-2')).toBeTruthy();
    expect(screen.getByTestId('chat-item-1')).toBeTruthy();
  });
});
