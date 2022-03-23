import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Data } from './Data';

import { Provider } from 'react-redux';
import { store } from '../../store/store';

describe('Data', () => {
  it('Компонент существует', () => {
    expect(Data).toBeInstanceOf(Function);
  });

  it('Снимок состояния', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="data" element={<Data />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    );
    expect(asFragment(<Data />)).toMatchSnapshot();
  });

  it('Состояние при старте', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="data" element={<Data />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    );

    setTimeout(() => {
      expect(screen.getByTestId('data-item-1')).toBeTruthy();
    }, 2000);
  });
});
