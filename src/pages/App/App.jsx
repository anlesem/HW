import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import style from './App.module.scss';

import { store } from '../../store/store';
import { Header } from '../../components/Header/Header';
import { Profile } from '../Profile/Profile';
import { NotFound } from '../NotFound/NotFound';
import { Footer } from '../../components/Footer/Footer';

// const Chats = React.lazy(() => import('../Chats/Chats'));
const Chats = React.lazy(() => import('../Chats/Chats').then((module) => ({ default: module.Chats, })));

export default function App() {
	const lesson = 'Урок 5';

	return (
		<div className={style.root}>
			<Provider store={store}>
				<BrowserRouter>
					<Header lesson={lesson} />
					<Routes>
						<Route path="/" element={<Profile />} />
						<Route path="chats" element={
							<React.Suspense fallback={<>...</>}>
								<Chats />
							</React.Suspense>
						} />
						<Route path="chats/:chatId" element={
							<React.Suspense fallback={<>...</>}>
								<Chats />
							</React.Suspense>
						} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</BrowserRouter>
				<Footer />
			</Provider>
		</div>
	);
}


