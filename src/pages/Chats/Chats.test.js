import { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

import App from '../App/App';
import { Chats } from './Chats';

import { Provider } from 'react-redux';
import { store } from '../../store/store';

let id = null;

describe('Chats. Базис', () => {
  it('Компонент существует', () => {
    expect(Chats).toBeInstanceOf(Function);
  });

  it('Снимок состояния', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route
              path="chats"
              element={
                <Suspense fallback={<>...</>}>
                  <Chats />
                </Suspense>
              }
            />
            <Route path="*" element={<Navigate to="chats" />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    );
    expect(asFragment(<Chats />)).toMatchSnapshot();
  });
});

describe('Chats. Работа с чатами и сообщениями', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  afterEach(cleanup);

  it('Вход', async () => {
    const login = screen.getByTestId('sign-email');
    const password = screen.getByTestId('sign-password');
    const button = screen.getByTestId('sign-submit');

    fireEvent.change(login, { target: { value: 'login@test.test' } });
    fireEvent.change(password, { target: { value: '123456' } });
    fireEvent.click(button);

    await new Promise((res) => setTimeout(res, 1000));

    expect(screen.getByText(/сообщения:/i)).toBeTruthy();
    expect(screen.getByTestId('chats-button-remove')).toHaveClass('Mui-disabled');

    id = +store.getState().chats.counterID;
    console.log('🚀 ~ it ~ id', id);
  });

  it('Добавление чата', async () => {
    const buttonAdd = screen.getByTestId('chats-button-add');

    fireEvent.click(buttonAdd);
    expect(screen.getByTestId(`chat-item-${id + 1}`)).toBeTruthy();
    expect(screen.queryByTestId(`chat-item-${id + 2}`)).toBeFalsy();

    await new Promise((res) => setTimeout(res, 500));

    fireEvent.click(buttonAdd);

    await new Promise((res) => setTimeout(res, 500));

    fireEvent.click(buttonAdd);
    expect(screen.getByTestId(`chat-item-${id + 2}`)).toBeTruthy();
    expect(screen.getByTestId(`chat-item-${id + 3}`)).toBeTruthy();
    expect(screen.queryByTestId(`chat-item-${id + 4}`)).toBeFalsy();
  });

  it('Переключение между чатами', async () => {
    fireEvent.click(screen.getByTestId(`chat-change-${id + 1}`));
    await new Promise((res) => setTimeout(res, 500));
    const inputMessage = screen.getByTestId('message-form-input');
    const buttonMessage = screen.getByTestId('message-form-button');

    expect(screen.getByText(`Добро пожаловать в чат №${id + 1}`)).toBeTruthy();
    expect(screen.getByTestId('list-item-0')).toBeTruthy();
    expect(inputMessage).not.toHaveClass('Mui-disabled');
    expect(buttonMessage).not.toHaveClass('Mui-disabled');

    fireEvent.click(screen.getByTestId(`chat-change-${id + 2}`));
    expect(screen.getByText(`Добро пожаловать в чат №${id + 2}`)).toBeTruthy();
  });

  it('Переименование чата', async () => {
    fireEvent.click(screen.getByTestId(`chat-change-${id + 2}`));
    await new Promise((res) => setTimeout(res, 500));
    expect(screen.getByText(`Добро пожаловать в чат №${id + 2}`)).toBeTruthy();
    const chatItem2 = screen.getByTestId(`chat-item-${id + 2}`);

    fireEvent.click(chatItem2);
    const inputName = screen.getByTestId('chat-form-input');
    const buttonName = screen.getByTestId('chat-form-button');

    fireEvent.change(inputName, { target: { value: 'TestNewName' } });
    expect(inputName.value).toBe('TestNewName');

    fireEvent.click(buttonName);
    await new Promise((res) => setTimeout(res, 500));
    expect(screen.getAllByText(/\btestnewname\b/gi)).toHaveLength(2);
    expect(screen.queryByTestId('chat-form-input')).toBeFalsy();
    expect(screen.queryByTestId('chat-form-button')).toBeFalsy();
  });

  it('Переименование чата по нажатию Enter', async () => {
    fireEvent.click(screen.getByTestId(`chat-change-${id + 3}`));
    await new Promise((res) => setTimeout(res, 500));
    expect(screen.getByText(`Добро пожаловать в чат №${id + 3}`)).toBeTruthy();
    const chatItem3 = screen.getByTestId(`chat-item-${id + 3}`);

    fireEvent.click(chatItem3);
    const inputName = screen.getByTestId('chat-form-input');

    fireEvent.change(inputName, { target: { value: 'TestAnotherName' } });
    fireEvent.keyDown(inputName, { key: 'enter', keyCode: 13 });
    await new Promise((res) => setTimeout(res, 500));
    expect(screen.getAllByText(/\btestAnotherName\b/gi)).toHaveLength(2);
    expect(screen.queryByTestId('chat-form-input')).toBeFalsy();
    expect(screen.queryByTestId('chat-form-button')).toBeFalsy();
  });

  it('Добавление сообщения по кнопке и Enter', async () => {
    fireEvent.click(screen.getByTestId(`chat-change-${id + 3}`));
    await new Promise((res) => setTimeout(res, 500));

    const inputMessage = screen.getByTestId('message-form-input');
    const buttonMessage = screen.getByTestId('message-form-button');

    fireEvent.change(inputMessage, { target: { value: 'SomeMessage' } });
    expect(inputMessage.value).toBe('SomeMessage');
    fireEvent.click(buttonMessage);
    expect(screen.getByText('SomeMessage')).toBeTruthy();
    expect(screen.getByTestId('list-item-1')).toBeTruthy();
    expect(screen.queryByTestId('list-item-2')).toBeFalsy();

    await new Promise((res) => setTimeout(res, 1500));
    expect(screen.getByText('I am bot')).toBeTruthy();
    expect(screen.getByTestId('list-item-2')).toBeTruthy();

    fireEvent.change(inputMessage, { target: { value: 'AnotherMessage' } });
    fireEvent.keyDown(inputMessage, { key: 'enter', keyCode: 13 });
    expect(screen.getByText('AnotherMessage')).toBeTruthy();
    expect(screen.getByTestId('list-item-3')).toBeTruthy();
    expect(screen.queryByTestId('list-item-4')).toBeFalsy();
  });

  it('Изменение значения поля ввода при переключении между чатами', async () => {
    fireEvent.click(screen.getByTestId(`chat-change-${id + 3}`));
    await new Promise((res) => setTimeout(res, 500));
    expect(screen.getAllByText(/\btestAnotherName\b/gi)).toHaveLength(2);

    const inputMessage = screen.getByTestId('message-form-input');
    fireEvent.change(inputMessage, { target: { value: 'SomeInputMessage' } });
    expect(inputMessage.value).toBe('SomeInputMessage');

    fireEvent.click(screen.getByTestId(`chat-change-${id + 2}`));
    await new Promise((res) => setTimeout(res, 500));
    expect(screen.getAllByText(/\btestnewname\b/gi)).toHaveLength(2);
    expect(inputMessage.value).toBe('');

    fireEvent.click(screen.getByTestId(`chat-change-${id + 3}`));
    expect(screen.getAllByText(/\btestAnotherName\b/gi)).toHaveLength(2);
    await new Promise((res) => setTimeout(res, 500));
    expect(inputMessage.value).toBe('SomeInputMessage');
  });

  it('Удаление чата', () => {
    const buttonRemove = screen.getByTestId('chats-button-remove');

    const chatCheck1 = screen.getByTestId(`chat-check-${id + 1}`);
    const chatCheck2 = screen.getByTestId(`chat-check-${id + 2}`);
    const chatCheck3 = screen.getByTestId(`chat-check-${id + 3}`);

    const chatItem1 = screen.getByTestId(`chat-item-${id + 1}`);
    const chatItem2 = screen.getByTestId(`chat-item-${id + 2}`);
    const chatItem3 = screen.getByTestId(`chat-item-${id + 3}`);

    expect(chatCheck1.checked).toBeFalsy();
    expect(buttonRemove).toHaveClass('Mui-disabled');
    expect(screen.queryByTestId('chat-form-input')).toBeFalsy();
    expect(screen.queryByTestId('chat-form-button')).toBeFalsy();

    fireEvent.click(chatItem1);
    expect(chatCheck1.checked).toBeTruthy();
    expect(buttonRemove).not.toHaveClass('Mui-disabled');
    expect(screen.getByTestId('chat-form-input')).toBeTruthy();
    expect(screen.getByTestId('chat-form-button')).toBeTruthy();

    fireEvent.click(chatItem2);
    expect(chatCheck1.checked).toBeTruthy();
    expect(chatCheck2.checked).toBeTruthy();
    expect(buttonRemove).not.toHaveClass('Mui-disabled');
    expect(screen.queryByTestId('chat-form-input')).toBeFalsy();
    expect(screen.queryByTestId('chat-form-button')).toBeFalsy();

    fireEvent.click(chatItem2);
    expect(chatCheck1.checked).toBeTruthy();
    expect(chatCheck2.checked).toBeFalsy();
    expect(buttonRemove).not.toHaveClass('Mui-disabled');
    expect(screen.getByTestId('chat-form-input')).toBeTruthy();
    expect(screen.getByTestId('chat-form-button')).toBeTruthy();

    fireEvent.click(chatItem2);
    fireEvent.click(chatItem3);
    expect(chatCheck1.checked).toBeTruthy();
    expect(chatCheck2.checked).toBeTruthy();
    expect(chatCheck3.checked).toBeTruthy();

    fireEvent.click(buttonRemove);
    expect(screen.queryByTestId(`chat-item-${id + 1}`)).toBeFalsy();
    expect(screen.queryByTestId(`chat-item-${id + 2}`)).toBeFalsy();
    expect(screen.queryByTestId(`chat-item-${id + 3}`)).toBeFalsy();
    expect(buttonRemove).toHaveClass('Mui-disabled');
    expect(screen.queryByTestId('chat-form-input')).toBeFalsy();
    expect(screen.queryByTestId('chat-form-button')).toBeFalsy();
  });
});
