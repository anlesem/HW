import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import { HeaderNavBar } from './HeaderNavBar';

describe('NavBar', () => {
  it('Компонент существует', () => {
    expect(HeaderNavBar).toBeInstanceOf(Function);
  });

  it('Снимок состояния', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <HeaderNavBar />
      </BrowserRouter>
    );
    expect(asFragment(<HeaderNavBar />)).toMatchSnapshot();
  });

  it('Наличие ссылок', () => {
    render(
      <BrowserRouter>
        <HeaderNavBar />
      </BrowserRouter>
    );

    expect(screen.getByRole('list')).toBeTruthy();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });
});
