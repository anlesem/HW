import { render, screen, fireEvent } from '@testing-library/react';
import { Form } from './Form';

describe('Form', () => {
   it('Компонент существует', () => {
      expect(Form).toBeInstanceOf(Function);
   });

   it('Начало: Основное поле ввода пустое', () => {
      const chatId = '2';
      const formData = { 'chatId': chatId };
      render(<Form formData={{ formData }} />);

      const input = screen.getByTestId('form-input');
      expect(input.value).toBe('');
   });

   it('Заполнение поле ввода', () => {
      const chatId = '2';
      const formData = { 'chatId': chatId };
      render(<Form formData={{ formData }} />);

      const input = screen.getByTestId('form-input');

      fireEvent.change(input, { target: { value: 'bla-bla-bla' } });
      expect(input.value).toBe('bla-bla-bla');
   });

   it('Обработка клика на кнопку', () => {
      const chatId = '2';
      const formData = { 'chatId': chatId };
      const sendMassage = jest.fn();

      render(<Form formData={{ chatId, sendMassage, formData }} />);

      const input = screen.getByTestId('form-input');
      const button = screen.getByTestId('form-button');

      fireEvent.click(button);
      expect(sendMassage).toBeCalled();
      expect(input.value).toBe('');
   });
});
