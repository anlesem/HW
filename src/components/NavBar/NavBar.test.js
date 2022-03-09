import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import { NavBar } from './NavBar';

describe('NavBar', () => {
   it('Компонент существует', () => {
      expect(NavBar).toBeInstanceOf(Function);
   });

   it('Изначально список сообщений существует, но пустой', () => {
      render(<BrowserRouter><NavBar /></BrowserRouter>);

      expect(screen.getByRole('list')).toBeTruthy();
      expect(screen.getAllByRole('listitem')).toHaveLength(2);
   });
});