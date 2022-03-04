import { render, screen, fireEvent } from '@testing-library/react';
import { MessageForm } from './MessageForm';

describe('MessageForm', () => {
   it('Компонент существует', () => {
      expect(MessageForm).toBeInstanceOf(Function);
   });

   it('Начало: Основное поле ввода пустое', () => {
      const chatId = '1';
      const formData = { 'chatId': chatId };
      render(<MessageForm formData={{ formData }} />);

      const input = screen.getByTestId('message-form-input');
      expect(input.value).toBe('');
   });

   it('Заполнение поле ввода', () => {
      const chatId = '1';
      const formData = { 'chatId': chatId };
      render(<MessageForm formData={{ formData }} />);

      const input = screen.getByTestId('message-form-input');

      fireEvent.change(input, { target: { value: 'bla-bla-bla' } });
      expect(input.value).toBe('bla-bla-bla');
   });

   it('Обработка клика на кнопку', () => {
      const chatId = '1';
      const formData = { 'chatId': chatId };
      const sendMassage = jest.fn();

      render(<MessageForm formData={{ chatId, sendMassage, formData }} />);

      const input = screen.getByTestId('message-form-input');
      const button = screen.getByTestId('message-form-button');

      fireEvent.change(input, { target: { value: 'bla-bla-bla' } });
      expect(input.value).toBe('bla-bla-bla');

      fireEvent.click(button);
      expect(sendMassage).toBeCalled();
      expect(input.value).toBe('');
   });
});
