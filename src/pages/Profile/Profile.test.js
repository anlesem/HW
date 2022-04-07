import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

import App from '../App/App';
import { Profile } from './Profile';

import { Provider } from 'react-redux';
import { store } from '../../store/store';

describe('Profile. Базис', () => {
  it('Компонент существует', () => {
    expect(Profile).toBeInstanceOf(Function);
  });

  it('Снимок состояния', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    );
    expect(asFragment(<Profile />)).toMatchSnapshot();
  });
});

describe('Profile. Смена имени пользователя', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  afterEach(cleanup);

  it('Вход', async () => {
    fireEvent.click(screen.getByTestId('profile-link-enter'));

    const login = screen.getByTestId('sign-email');
    const password = screen.getByTestId('sign-password');
    const button = screen.getByTestId('sign-submit');

    fireEvent.change(login, { target: { value: 'login@test.test' } });
    fireEvent.change(password, { target: { value: '123456' } });
    fireEvent.click(button);

    await new Promise((res) => setTimeout(res, 1000));

    expect(screen.getByText(/login@test.test/i)).toBeTruthy();

    const inputCheckbox = screen.getByTestId('profile-check');

    expect(screen.getByText(/login@test.test/i)).toBeTruthy();
    expect(inputCheckbox.checked).toBe(false);

    expect(screen.queryByTestId('profile-button-exit')).toBeTruthy();

    expect(screen.queryByTestId('profile-form-input')).not.toBeInTheDocument();
    expect(screen.queryByTestId('profile-form-button')).toBeFalsy();
  });

  it('Переключатель', () => {
    expect(screen.getByText(/login@test.test/i)).toBeTruthy();

    const itemCheckbox = screen.getByTestId('profile-box');
    const inputCheckbox = screen.getByTestId('profile-check');

    fireEvent.click(itemCheckbox);
    expect(inputCheckbox.checked).toBe(true);
    expect(screen.getByTestId('profile-form-input')).toBeInTheDocument();
    expect(screen.getByTestId('profile-form-button')).toBeInTheDocument();
  });

  it('Действие', () => {
    const inputCheckbox = screen.getByTestId('profile-check');
    const inputName = screen.getByTestId('profile-form-input');
    const buttonName = screen.getByTestId('profile-form-button');

    expect(inputCheckbox.checked).toBe(true);
    expect(screen.getByTestId('profile-form-input')).toBeInTheDocument();
    expect(screen.getByTestId('profile-form-button')).toBeInTheDocument();

    fireEvent.change(inputName, { target: { value: 'TestName' } });
    expect(inputName.value).toBe('TestName');

    fireEvent.click(buttonName);
    expect(screen.getByText('TestName')).toBeTruthy();
    expect(screen.queryByTestId('profile-form-input')).toBeFalsy();
    expect(screen.queryByTestId('profile-form-button')).toBeFalsy();
  });

  it('Нажатие на Enter', () => {
    const itemCheckbox = screen.getByTestId('profile-box');
    fireEvent.click(itemCheckbox);

    const inputCheckbox = screen.getByTestId('profile-check');
    const inputName = screen.getByTestId('profile-form-input');

    expect(inputCheckbox.checked).toBe(true);

    fireEvent.change(inputName, { target: { value: 'Андрей' } });
    expect(inputName.value).toBe('Андрей');

    fireEvent.keyDown(inputName, { key: 'enter', keyCode: 13 });
    expect(screen.getByText(/андрей/i)).toBeTruthy();
    expect(screen.queryByTestId('profile-form-input')).toBeFalsy();
    expect(screen.queryByTestId('profile-form-button')).toBeFalsy();
  });
});
