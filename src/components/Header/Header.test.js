import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('Header', () => {
   it('Компонент существует', () => {
      expect(Header).toBeInstanceOf(Function);
   });

   it('Изначально список сообщений существует, но пустой', () => {
      const lesson = 'Урок';
      render(<BrowserRouter><Header lesson={lesson} /></BrowserRouter>);

      expect(screen.getByText(/урок/i)).toBeTruthy();
   });
});