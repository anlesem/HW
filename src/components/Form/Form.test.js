import { render, screen, fireEvent } from '@testing-library/react';
import { Form } from './Form';

describe('Form', () => {
   it('Компонент существует', () => {
      expect(Form).toBeInstanceOf(Function);
   });

   it('Начало: Основное поле ввода пустое', () => {
      render(<Form />);
      const input = screen.getByTestId('form-inputAuthor');
      expect(input.value).toBe('');
   });

   it('Заполнение поле ввода', () => {
      render(<Form />);
      const input = screen.getByTestId('form-inputAuthor');

      fireEvent.change(input, { target: { value: 'bla-bla-bla' } });
      expect(input.value).toBe('bla-bla-bla');
   });

   it('Обработка клика на кнопку', () => {
      const addMessage = jest.fn();

      render(<Form addMessage={addMessage} />);

      const input = screen.getByTestId('form-inputAuthor');
      const button = screen.getByTestId('form-button');

      fireEvent.click(button);
      expect(addMessage).toBeCalled();
      expect(input.value).toBe('');
   });
});
