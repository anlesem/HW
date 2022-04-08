import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './Header';

describe('Header', () => {
  it('Компонент существует', () => {
    expect(Header).toBeInstanceOf(Function);
  });

  it('Снимок состояния', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(asFragment(<Header />)).toMatchSnapshot();
  });
});
