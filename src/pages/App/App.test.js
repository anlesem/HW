import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('Компонент существует', () => {
    expect(App).toBeInstanceOf(Function);
  });

  it('Состояние при загрузке', () => {
    render(<App />);

    expect(screen.getByText(/чаты/i)).toBeTruthy();
    expect(screen.getByText(/профиль/i)).toBeTruthy();
    expect(screen.getAllByRole('heading')).toBeTruthy();
  });
});
