import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Chats } from './Chats';

import { Provider } from 'react-redux';
import { store } from '../../store/store';

describe('Chats', () => {
   it('Компонент существует', () => {
      expect(Chats).toBeInstanceOf(Function);
   });

   it('Состояние при переходе на вкладку Чаты', () => {
      render(<Provider store={store}><BrowserRouter>
         <Routes>
            <Route path="chats" element={
               <React.Suspense fallback={<>...</>}>
                  <Chats />
               </React.Suspense>} />
            <Route path="*" element={<Navigate to="chats" />} />
         </Routes>
      </BrowserRouter></Provider>);

      const buttonRemove = screen.getByTestId('chats-button-remove');
      const inputMessage = screen.getByTestId('message-form-input');
      const buttonMessage = screen.getByTestId('message-form-button');

      expect(screen.getByText(/чат 1/i)).toBeTruthy();
      expect(screen.getByText(/выберите чат/i)).toBeTruthy();
      expect(screen.getByTestId('chat-item-1')).toBeTruthy();
      expect(screen.queryByTestId('chat-item-2')).toBeFalsy();

      expect(buttonRemove).toHaveClass("Mui-disabled");
      expect(inputMessage).toHaveClass("Mui-disabled");
      expect(buttonMessage).toHaveClass("Mui-disabled");
   });

   it('Добавление чата', () => {
      render(<Provider store={store}><BrowserRouter>
         <Routes>
            <Route path="chats" element={
               <React.Suspense fallback={<>...</>}>
                  <Chats />
               </React.Suspense>} />
            <Route path="*" element={<Navigate to="chats" />} />
         </Routes>
      </BrowserRouter></Provider>);

      const buttonAdd = screen.getByTestId('chats-button-add');

      fireEvent.click(buttonAdd);
      expect(screen.getByTestId('chat-item-1')).toBeTruthy();
      expect(screen.getByTestId('chat-item-2')).toBeTruthy();
      expect(screen.queryByTestId('chat-item-3')).toBeFalsy();

      fireEvent.click(buttonAdd);
      expect(screen.getByTestId('chat-item-3')).toBeTruthy();
      expect(screen.queryByTestId('chat-item-4')).toBeFalsy();
   });

   it('Удаление чата', () => {
      render(<Provider store={store}><BrowserRouter>
         <Routes>
            <Route path="chats" element={
               <React.Suspense fallback={<>...</>}>
                  <Chats />
               </React.Suspense>} />
            <Route path="*" element={<Navigate to="chats" />} />
         </Routes>
      </BrowserRouter></Provider>);

      const chatItem1 = screen.getByTestId('chat-item-1');
      const buttonAdd = screen.getByTestId('chats-button-add');
      const buttonRemove = screen.getByTestId('chats-button-remove');
      const chatInput1 = screen.getByTestId('chat-check-1');

      expect(chatInput1.checked).toBeFalsy();
      expect(screen.getByText(/чат 1/i)).toBeTruthy();
      expect(buttonRemove).toHaveClass("Mui-disabled");
      expect(screen.queryByTestId('chat-form-input')).toBeFalsy();
      expect(screen.queryByTestId('chat-form-button')).toBeFalsy();


      fireEvent.click(chatItem1);
      expect(chatInput1.checked).toBeTruthy();
      expect(buttonRemove).not.toHaveClass("Mui-disabled");
      expect(screen.getByTestId('chat-form-input')).toBeTruthy();
      expect(screen.getByTestId('chat-form-button')).toBeTruthy();

      fireEvent.click(buttonRemove);
      expect(screen.getByText(/чат 2/i)).toBeTruthy();
      expect(buttonRemove).toHaveClass("Mui-disabled");
      expect(screen.queryByTestId('chat-item-1')).toBeFalsy();
      expect(screen.getByTestId('chat-item-2')).toBeTruthy();

      fireEvent.click(buttonAdd);
      fireEvent.click(buttonAdd);
      expect(screen.getByText(/чат 3/i)).toBeTruthy();
      expect(screen.getByText(/чат 4/i)).toBeTruthy();
      expect(buttonRemove).toHaveClass("Mui-disabled");
      expect(screen.queryByTestId('chat-form-input')).toBeFalsy();
      expect(screen.queryByTestId('chat-form-button')).toBeFalsy();

      const chatItem2 = screen.getByTestId('chat-item-2');
      const chatItem3 = screen.getByTestId('chat-item-3');
      const chatItem4 = screen.getByTestId('chat-item-4');
      const chatInput2 = screen.getByTestId('chat-check-2');
      const chatInput3 = screen.getByTestId('chat-check-3');
      const chatInput4 = screen.getByTestId('chat-check-4');

      fireEvent.click(chatItem2);
      expect(chatInput2.checked).toBeTruthy();
      expect(buttonRemove).not.toHaveClass("Mui-disabled");
      expect(screen.getByTestId('chat-form-input')).toBeTruthy();
      expect(screen.getByTestId('chat-form-button')).toBeTruthy();

      fireEvent.click(chatItem3);
      fireEvent.click(chatItem4);
      expect(chatInput3.checked).toBeTruthy();
      expect(chatInput4.checked).toBeTruthy();
      expect(buttonRemove).not.toHaveClass("Mui-disabled");
      expect(screen.queryByTestId('chat-form-input')).toBeFalsy();
      expect(screen.queryByTestId('chat-form-button')).toBeFalsy();

      fireEvent.click(buttonRemove);
      expect(screen.getByText(/чат 5/i)).toBeTruthy();
      expect(buttonRemove).toHaveClass("Mui-disabled");
      expect(screen.queryByTestId('chat-item-4')).toBeFalsy();
      expect(screen.getByTestId('chat-item-5')).toBeTruthy();
      expect(screen.queryByTestId('chat-item-6')).toBeFalsy();
      expect(screen.queryByTestId('chat-form-input')).toBeFalsy();
      expect(screen.queryByTestId('chat-form-button')).toBeFalsy();
   });

   it('Переименование чата', () => {
      render(<Provider store={store}><BrowserRouter>
         <Routes>
            <Route path="chats" element={
               <React.Suspense fallback={<>...</>}>
                  <Chats />
               </React.Suspense>} />
            <Route path="*" element={<Navigate to="chats" />} />
         </Routes>
      </BrowserRouter></Provider>);

      const buttonAdd = screen.getByTestId('chats-button-add');
      const chatItem1 = screen.getByTestId('chat-item-1');

      expect(screen.getByText(/чат 1/i)).toBeTruthy();

      fireEvent.click(chatItem1);

      const inputName = screen.getByTestId('chat-form-input');
      const buttonName = screen.getByTestId('chat-form-button');

      fireEvent.change(inputName, { target: { value: 'Вася' } });
      expect(inputName.value).toBe('Вася');

      fireEvent.click(buttonName);
      expect(screen.getByText(/вася/i)).toBeTruthy();
      expect(screen.queryByTestId('chat-form-input')).toBeFalsy();
      expect(screen.queryByTestId('chat-form-button')).toBeFalsy();

      fireEvent.click(buttonAdd);
      expect(screen.getByText(/чат 2/i)).toBeTruthy();

      const chatItem2 = screen.getByTestId('chat-item-2');

      fireEvent.click(chatItem2);
      fireEvent.change(inputName, { target: { value: 'Петя' } });

      fireEvent.click(chatItem1);
      expect(screen.queryByTestId('chat-form-input')).toBeFalsy();
      expect(screen.queryByTestId('chat-form-button')).toBeFalsy();

      fireEvent.click(chatItem1);
      fireEvent.click(buttonName);
      expect(screen.getByText(/вася/i)).toBeTruthy();
      expect(screen.getByText(/чат 2/i)).toBeTruthy();
   });

   it('Переименование чата по нажатию Enter', () => {
      render(<Provider store={store}><BrowserRouter>
         <Routes>
            <Route path="chats" element={
               <React.Suspense fallback={<>...</>}>
                  <Chats />
               </React.Suspense>} />
            <Route path="*" element={<Navigate to="chats" />} />
         </Routes>
      </BrowserRouter></Provider>);

      const chatItem1 = screen.getByTestId('chat-item-1');
      expect(screen.getByText(/вася/i)).toBeTruthy();

      fireEvent.click(chatItem1);

      const inputName = screen.getByTestId('chat-form-input');

      fireEvent.change(inputName, { target: { value: 'Петя' } });
      expect(inputName.value).toBe('Петя');

      fireEvent.keyDown(inputName, { key: 'enter', keyCode: 13 });
      expect(screen.getByText(/петя/i)).toBeTruthy();
      expect(screen.queryByTestId('chat-form-input')).toBeFalsy();
      expect(screen.queryByTestId('chat-form-button')).toBeFalsy();
   });
});

describe('Chats/id', () => {
   it('Состояние при открытии чата', () => {
      render(<Provider store={store}><BrowserRouter>
         <Routes>
            <Route path="chats/:chatId" element={
               <React.Suspense fallback={<>...</>}>
                  <Chats />
               </React.Suspense>} />
            <Route path="*" element={<Navigate to="chats/1" />} />
         </Routes>
      </BrowserRouter></Provider>);

      const inputMessage = screen.getByTestId('message-form-input');
      const buttonMessage = screen.getByTestId('message-form-button');

      expect(screen.getByText(/Добро пожаловать в чат №1/)).toBeTruthy();
      expect(screen.getByTestId('list-item-0')).toBeTruthy();
      expect(inputMessage).not.toHaveClass("Mui-disabled");
      expect(buttonMessage).not.toHaveClass("Mui-disabled");
   });

   it('Добавление сообщения', () => {
      render(<Provider store={store}><BrowserRouter>
         <Routes>
            <Route path="chats/:chatId" element={
               <React.Suspense fallback={<>...</>}>
                  <Chats />
               </React.Suspense>} />
            <Route path="*" element={<Navigate to="chats/1" />} />
         </Routes>
      </BrowserRouter></Provider>);

      const inputMessage = screen.getByTestId('message-form-input');
      const buttonMessage = screen.getByTestId('message-form-button');

      fireEvent.change(inputMessage, { target: { value: 'SomeMessage' } });
      expect(inputMessage.value).toBe('SomeMessage');
      fireEvent.click(buttonMessage);
      expect(screen.getByText(/SomeMessage/)).toBeTruthy();
      expect(screen.getByTestId('list-item-1')).toBeTruthy();
      expect(screen.queryByTestId('list-item-2')).toBeFalsy();

      setTimeout(() => {
         expect(screen.getByTestId('list-item-2')).toBeTruthy();

         fireEvent.change(inputMessage, { target: { value: 'AnotherMessage' } });
         expect(inputMessage.value).toBe('AnotherMessage');

         fireEvent.keyDown(inputMessage, { key: 'enter', keyCode: 13 })
         expect(screen.getByText(/AnotherMessage/)).toBeTruthy();
         expect(screen.getByTestId('list-item-3')).toBeTruthy();
         expect(screen.queryByTestId('list-item-4')).toBeFalsy();
      }, 2000);
   });

   it('Изменение значения поля ввода при переключении между чатами', () => {
      render(<Provider store={store}><BrowserRouter>
         <Routes>
            <Route path="chats/:chatId" element={
               <React.Suspense fallback={<>...</>}>
                  <Chats />
               </React.Suspense>} />
            <Route path="*" element={<Navigate to="chats/1" />} />
         </Routes>
      </BrowserRouter></Provider>);

      const buttonAdd = screen.getByTestId('chats-button-add');
      const inputMessage = screen.getByTestId('message-form-input');

      fireEvent.click(buttonAdd);
      expect(screen.getByTestId('chat-item-1')).toBeTruthy();
      expect(screen.getByTestId('chat-item-2')).toBeTruthy();

      const chatChange1 = screen.getByTestId('chat-change-1');
      const chatChange2 = screen.getByTestId('chat-change-2');

      fireEvent.change(inputMessage, { target: { value: 'SomeMessage' } });
      expect(inputMessage.value).toBe('SomeMessage');

      fireEvent.click(chatChange2);
      expect(screen.getByText(/Добро пожаловать в чат №2/)).toBeTruthy();
      expect(inputMessage.value).toBe('');

      fireEvent.click(chatChange1);
      expect(screen.getByText(/Добро пожаловать в чат №1/)).toBeTruthy();
      expect(inputMessage.value).toBe('SomeMessage');
   });

});