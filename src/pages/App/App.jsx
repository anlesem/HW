import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import style from './App.module.scss';

import { Header } from '../../components/Header/Header';
import { Profile } from '../Profile/Profile';
import { NotFound } from '../NotFound/NotFound';
import { Footer } from '../../components/Footer/Footer';

// const Chats = React.lazy(() => import('../Chats/Chats'));
const Chats = React.lazy(() => import('../Chats/Chats').then((module) => ({ default: module.Chats, })));

export default function App() {
	const lesson = 'Урок 4';

	return (
		<div className={style.root}>
			<BrowserRouter>
				<Header lesson={lesson} />
				<Routes>
					<Route path="/" element={<Profile />} />
					<Route path="chats" element={
						<React.Suspense fallback={<>...</>}>
							<Chats />
						</React.Suspense>
					} />
					<Route path=":chatId" element={<Chats />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
			<Footer />
		</div>
	);
}


