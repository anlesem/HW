import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '../../store/store';

import style from './App.module.scss';

import { Layout } from '../Layout/Layout';
import { Profile } from '../Profile/Profile';
import { NotFound } from '../NotFound/NotFound';

// const Chats = React.lazy(() => import('../Chats/Chats'));
const Chats = React.lazy(() =>
  import('../Chats/Chats').then((module) => ({ default: module.Chats }))
);

export default function App() {
  const lesson = 'Урок 7';

  return (
    <div className={style.root}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout lesson={lesson} />}>
                <Route index element={<Profile />} />
                <Route
                  path="chats"
                  element={
                    <React.Suspense fallback={<>...</>}>
                      <Chats />
                    </React.Suspense>
                  }
                />
                <Route
                  path="chats/:chatId"
                  element={
                    <React.Suspense fallback={<>...</>}>
                      <Chats />
                    </React.Suspense>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </div>
  );
}
