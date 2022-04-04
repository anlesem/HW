import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import style from './App.module.scss';

import { Layout } from '../Layout/Layout';
import { Profile } from '../Profile/Profile';
import { Data } from '../Data/Data';
import { NotFound } from '../NotFound/NotFound';
import { ProgressBar } from '../../components/ProgressBar/ProgressBar';
import { Sign } from '../Sign/Sign';

import { auth } from '../../services/firebase';
import { changeLogin, initProfileDataThunk, toggleAuth } from '../../store/profile/actions';
import { setChatsDataThunk, unsetChatsDataThunk } from '../../store/chats/actions';
import { setMessageDataThunk, unsetMessageDataThunk } from '../../store/messages/actions';
import { Private } from '../../HOC/Private';

// const Chats = React.lazy(() => import('../Chats/Chats'));
const Chats = React.lazy(() =>
  import('../Chats/Chats').then((module) => ({ default: module.Chats }))
);

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(toggleAuth(true));
        dispatch(changeLogin(user.email));
        dispatch(initProfileDataThunk());
        dispatch(setChatsDataThunk());
        dispatch(unsetMessageDataThunk());
        dispatch(setMessageDataThunk());
      } else {
        dispatch(toggleAuth(false));
        dispatch(changeLogin('email'));
        dispatch(unsetChatsDataThunk());
        dispatch(unsetMessageDataThunk());
      }
    });
  }, []);

  return (
    <div className={style.root}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Profile />} />
            <Route path="sign" element={<Sign />} />
            <Route path="sign/:reg" element={<Sign />} />
            <Route
              path="chats"
              element={
                <Private>
                  <React.Suspense fallback={<ProgressBar />}>
                    <Chats />
                  </React.Suspense>
                </Private>
              }
            />
            <Route
              path="chats/:chatId"
              element={
                <React.Suspense fallback={<ProgressBar />}>
                  <Chats />
                </React.Suspense>
              }
            />
            <Route path="data" element={<Data />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
