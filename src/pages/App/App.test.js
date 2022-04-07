import { render, screen, fireEvent, cleanup } from '@testing-library/react';

import App from './App';

import { Provider } from 'react-redux';
import { store } from '../../store/store';

describe('App базис', () => {
  it('Компонент существует', () => {
    expect(App).toBeInstanceOf(Function);
  });

  it('Снимок состояния', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(asFragment(<App />)).toMatchSnapshot();
  });
});

describe('App переходы и авторизация', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  afterEach(cleanup);

  it('Состояние при загрузке', () => {
    expect(screen.getByText(/чаты/i)).toBeTruthy();
    expect(screen.getByText(/профиль/i)).toBeTruthy();
    expect(screen.getByText(/данные/i)).toBeTruthy();
    expect(screen.getAllByRole('heading')).toBeTruthy();
  });

  it('Переходы между страницами', async () => {
    const navLink1 = screen.getByTestId('NavLink-1');
    const navLink2 = screen.getByTestId('NavLink-2');
    const navLink3 = screen.getByTestId('NavLink-3');

    expect(screen.getByText(/user/i)).toBeTruthy();

    fireEvent.click(navLink2);

    expect(screen.getByText(/авторизация/i)).toBeTruthy();

    fireEvent.click(navLink3);

    expect(screen.getByTestId('progress')).toBeTruthy();

    fireEvent.click(navLink1);

    expect(screen.getByText(/user/i)).toBeTruthy();

    fireEvent.click(screen.getByTestId('profile-link-enter'));

    expect(screen.getByText(/авторизация/i)).toBeTruthy();
    expect(screen.getByText(/вход/i)).toBeTruthy();

    fireEvent.click(navLink1);
    fireEvent.click(screen.getByTestId('profile-link-reg'));

    expect(screen.getByText(/авторизация/i)).toBeTruthy();
    expect(screen.getByText(/регистрация/i)).toBeTruthy();
  });

  it('Авторизация. Поля', () => {
    expect(screen.getByText(/авторизация/i)).toBeTruthy();
    expect(screen.getByText(/регистрация/i)).toBeTruthy();

    const login = screen.getByTestId('sign-email');
    const button = screen.getByTestId('sign-submit');

    fireEvent.change(login, { target: { value: 'Вася' } });
    expect(login.value).toBe('Вася');

    fireEvent.click(button);

    expect(screen.getByText(/авторизация/i)).toBeTruthy();
    expect(screen.getByText(/регистрация/i)).toBeTruthy();
  });

  it('Регистрация', async () => {
    expect(screen.getByText(/авторизация/i)).toBeTruthy();
    expect(screen.getByText(/регистрация/i)).toBeTruthy();

    const login = screen.getByTestId('sign-email');
    const password = screen.getByTestId('sign-password');
    const button = screen.getByTestId('sign-submit');

    fireEvent.change(login, { target: { value: 'noLogin@test.test' } });
    fireEvent.change(password, { target: { value: '1234' } });
    fireEvent.click(button);

    await new Promise((res) => setTimeout(res, 1000));

    expect(screen.getByText(/Password should be at least 6 characters/)).toBeTruthy();

    fireEvent.change(login, { target: { value: 'login@test.test' } });
    fireEvent.change(password, { target: { value: '123456' } });
    fireEvent.click(button);

    await new Promise((res) => setTimeout(res, 1000));

    expect(screen.getByText(/auth\/email-already-in-use/)).toBeTruthy();
  });

  it('Вход', async () => {
    fireEvent.click(screen.getByTestId('NavLink-1'));
    fireEvent.click(screen.getByTestId('profile-link-enter'));

    expect(screen.getByText(/вход/i)).toBeTruthy();

    const login = screen.getByTestId('sign-email');
    const password = screen.getByTestId('sign-password');
    const button = screen.getByTestId('sign-submit');

    fireEvent.change(login, { target: { value: 'noLogin@test.test' } });
    fireEvent.change(password, { target: { value: '123456' } });
    fireEvent.click(button);

    await new Promise((res) => setTimeout(res, 1000));

    expect(screen.getByText(/auth\/user-not-found/)).toBeTruthy();

    fireEvent.change(login, { target: { value: 'login@test.test' } });
    fireEvent.change(password, { target: { value: '12345678' } });
    fireEvent.click(button);

    await new Promise((res) => setTimeout(res, 1000));

    expect(screen.getByText(/auth\/wrong-password/)).toBeTruthy();

    fireEvent.change(login, { target: { value: 'login@test.test' } });
    fireEvent.change(password, { target: { value: '123456' } });
    fireEvent.click(button);

    await new Promise((res) => setTimeout(res, 1000));

    expect(screen.getByText('login@test.test')).toBeTruthy();
  });

  it('Выход', async () => {
    fireEvent.click(screen.getByTestId('profile-button-exit'));

    await new Promise((res) => setTimeout(res, 1000));

    expect(screen.getByText('email')).toBeTruthy();
  });

  it('Авторизация в Чатах', async () => {
    fireEvent.click(screen.getByTestId('NavLink-2'));

    expect(screen.getByText(/вход/i)).toBeTruthy();

    const login = screen.getByTestId('sign-email');
    const password = screen.getByTestId('sign-password');
    const button = screen.getByTestId('sign-submit');

    fireEvent.change(login, { target: { value: 'login@test.test' } });
    fireEvent.change(password, { target: { value: '123456' } });
    fireEvent.click(button);

    await new Promise((res) => setTimeout(res, 2000));

    expect(screen.getByText('Сообщения:')).toBeTruthy();
  });
});
