import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import style from './App.module.scss';

import { Header } from '../../components/Header/Header';
import { Profile } from '../Profile/Profile';
import { Chats } from '../Chats/Chats';
import { NotFound } from '../NotFound/NotFound';
import { Footer } from '../../components/Footer/Footer';


function App() {
	const lesson = 'Урок 4';

	return (
		<div className={style.root}>
			<BrowserRouter>
				<Header lesson={lesson} />
				<Routes>
					<Route path="/" element={<Profile />} />
					<Route path="chats" element={<Chats />} />
					<Route path=":chatId" element={<Chats />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
			<Footer />
		</div>
	);
}

export default App;
