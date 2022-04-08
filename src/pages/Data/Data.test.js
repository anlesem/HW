import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Data } from './Data';
import { GLOBAL } from '../../GlobalData';

import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { Layout } from '../Layout/Layout';

describe('Data. База', () => {
  it('Компонент существует', () => {
    expect(Data).toBeInstanceOf(Function);
  });

  it('Снимок состояния', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="data" element={<Data />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    );
    expect(asFragment(<Data />)).toMatchSnapshot();
  });
});

describe('Data. Функционал', () => {
  it('Состояние on-line', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Data api={GLOBAL.api} />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId('progress')).toBeTruthy();

    await new Promise((res) => setTimeout(res, 2000));

    expect(screen.getByTestId('data-item-1')).toBeTruthy();
  });

  it('Состояние off-line', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route
                index
                element={<Data api={'https://jsonplaceholder.typicode.com/sts?userId=1'} />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId('progress')).toBeTruthy();

    await new Promise((res) => setTimeout(res, 2000));

    expect(screen.getByText(`Ошибка получения данных`)).toBeTruthy();

    fireEvent.click(screen.getByTestId(`data-button-reload`));
    expect(screen.getByTestId('progress')).toBeTruthy();
  });
});
