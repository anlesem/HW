import { render, screen, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('Компонент существует', () => {
    expect(App).toBeInstanceOf(Function);
  });

  it('Снимок состояния', () => {
    const { asFragment } = render(<App />);
    expect(asFragment(<App />)).toMatchSnapshot();
  });

  it('Состояние при загрузке', () => {
    render(<App />);

    expect(screen.getByText(/чаты/i)).toBeTruthy();
    expect(screen.getByText(/профиль/i)).toBeTruthy();
    expect(screen.getAllByRole('heading')).toBeTruthy();
  });

  it('Переходы', () => {
    render(<App />);

    expect(screen.getByText(/авторизоваться/i)).toBeTruthy();

    const navLink1 = screen.getByTestId('NavLink-1');
    const navLink2 = screen.getByTestId('NavLink-2');

    fireEvent.click(navLink2);
    expect(screen.getByTestId('progress')).toBeTruthy();

    fireEvent.click(navLink1);
    expect(screen.getByText(/авторизоваться/i)).toBeTruthy();
  });
});
