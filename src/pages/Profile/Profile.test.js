import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Profile } from './Profile';

import { Provider } from 'react-redux';
import { store } from '../../store/store';

describe('Profile', () => {
   it('Компонент существует', () => {
      expect(Profile).toBeInstanceOf(Function);
   });

   it('Снимок состояния', () => {
      const { asFragment } = render(<Provider store={store}><BrowserRouter>
         <Routes>
            <Route path="/" element={<Profile />} />
         </Routes>
      </BrowserRouter></Provider>);
      expect(asFragment(<Profile />)).toMatchSnapshot();
   });

   it('Состояние при старте', () => {
      render(<Provider store={store}><BrowserRouter>
         <Routes>
            <Route path="/" element={<Profile />} />
         </Routes>
      </BrowserRouter></Provider>);

      const inputCheckbox = screen.getByTestId('profile-check');

      expect(screen.getByText(/user/i)).toBeTruthy();
      expect(screen.getByText(/авторизоваться/i)).toBeTruthy();
      expect(inputCheckbox.checked).toBe(false);

      expect(screen.queryByTestId('profile-form-input')).not.toBeInTheDocument()
      expect(screen.queryByTestId('profile-form-button')).toBeFalsy();


   });

   it('Нажатие на "Авторизоваться"', () => {
      render(<Provider store={store}><BrowserRouter>
         <Routes>
            <Route path="/" element={<Profile />} />
         </Routes>
      </BrowserRouter></Provider>);

      const itemCheckbox = screen.getByTestId('profile-box');
      const inputCheckbox = screen.getByTestId('profile-check');

      fireEvent.click(itemCheckbox);
      expect(inputCheckbox.checked).toBe(true);
      expect(screen.getByTestId('profile-form-input')).toBeInTheDocument()
      expect(screen.getByTestId('profile-form-button')).toBeInTheDocument()
   });

   it('Смена имени пользователя', () => {
      render(<Provider store={store}><BrowserRouter>
         <Routes>
            <Route path="/" element={<Profile />} />
         </Routes>
      </BrowserRouter></Provider>);

      const inputCheckbox = screen.getByTestId('profile-check');
      const inputName = screen.getByTestId('profile-form-input');
      const buttonName = screen.getByTestId('profile-form-button');

      expect(inputCheckbox.checked).toBe(true);
      expect(screen.getByTestId('profile-form-input')).toBeInTheDocument()
      expect(screen.getByTestId('profile-form-button')).toBeInTheDocument()

      fireEvent.change(inputName, { target: { value: 'Петя' } });
      expect(inputName.value).toBe('Петя');

      fireEvent.click(buttonName);
      expect(screen.getByText(/петя/i)).toBeTruthy();
      expect(screen.queryByTestId('profile-form-input')).toBeFalsy();
      expect(screen.queryByTestId('profile-form-button')).toBeFalsy();
   });

   it('Нажатие Enter', () => {
      render(<Provider store={store}><BrowserRouter>
         <Routes>
            <Route path="/" element={<Profile />} />
         </Routes>
      </BrowserRouter></Provider>);

      const itemCheckbox = screen.getByTestId('profile-box');
      fireEvent.click(itemCheckbox);

      const inputCheckbox = screen.getByTestId('profile-check');
      const inputName = screen.getByTestId('profile-form-input');

      expect(inputCheckbox.checked).toBe(true);

      fireEvent.change(inputName, { target: { value: 'Вася' } });
      expect(inputName.value).toBe('Вася');

      fireEvent.keyDown(inputName, { key: 'enter', keyCode: 13 })
      expect(screen.getByText(/вася/i)).toBeTruthy();
      expect(screen.queryByTestId('profile-form-input')).toBeFalsy();
      expect(screen.queryByTestId('profile-form-button')).toBeFalsy();
   });
});