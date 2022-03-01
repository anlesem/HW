import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Chats } from './Chats';

describe('Chats', () => {
   it('Компонент существует', () => {
      expect(Chats).toBeInstanceOf(Function);
   });

   it('При клике на кнопку в Форме содержимое Списка сообщений меняется', () => {
      render(<BrowserRouter>
         <Routes>
            <Route path="chats/:chatId" element={
               <React.Suspense fallback={<>...</>}>
                  <Chats />
               </React.Suspense>} />
            <Route path="*" element={<Navigate to="chats/1" />} />
         </Routes>
      </BrowserRouter>);

      // screen.debug(undefined, 300000);

      const input = screen.getByTestId('form-input');
      const button = screen.getByTestId('form-button');

      // Добавление нового сообщения.
      fireEvent.change(input, { target: { value: 'SomeMessage' } });
      expect(input.value).toBe('SomeMessage');
      fireEvent.click(button);
      expect(screen.getByText('SomeMessage')).toBeTruthy();
      expect(screen.getByTestId('list-item-0')).toBeTruthy();

      // Добавление нового сообщения. Список сообщений меняется, а Чат нет
      fireEvent.change(input, { target: { value: 'AnotherMessage' } });
      expect(input.value).toBe('AnotherMessage');
      fireEvent.click(button);
      expect(screen.getByTestId('list-item-1')).toBeTruthy();
   });

   it('При клике на кнопку Добавить чат список чатов меняется', () => {
      render(<BrowserRouter>
         <Routes>
            <Route path="chats" element={
               <React.Suspense fallback={<>...</>}>
                  <Chats />
               </React.Suspense>} />
            <Route path="chats/:chatId" element={
               <React.Suspense fallback={<>...</>}>
                  <Chats />
               </React.Suspense>} />
            <Route path="/" element={<Navigate to="chats/1" />} />
         </Routes>
      </BrowserRouter>);

      const buttonAdd = screen.getByTestId('chats-button-add');
      const buttonRemove = screen.getByTestId('chats-button-remove');

      expect(screen.getByTestId('chat-item-1')).toBeTruthy();
      expect(screen.queryByTestId('chat-item-4')).not.toBeInTheDocument();

      fireEvent.click(buttonAdd);
      expect(screen.getByTestId('chat-item-4')).toBeTruthy();

      fireEvent.click(buttonAdd);
      expect(screen.getByTestId('chat-item-5')).toBeTruthy();

      fireEvent.click(buttonRemove);
      expect(screen.queryByTestId('chat-item-1')).not.toBeInTheDocument();
   });

});