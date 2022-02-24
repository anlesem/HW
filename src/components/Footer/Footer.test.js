import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
   it('Компонент существует', () => {
      expect(Footer).toBeInstanceOf(Function);
   });

   it('Изначально список сообщений существует, но пустой', () => {
      render(<Footer />);

      expect(screen.getByTestId('footer-paragraph')).toBeTruthy();
   });
});