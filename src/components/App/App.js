import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import style from './App.module.scss';

import { Header } from '../Header/Header';
// import { Message } from '../Message/Message';
import { MessageList } from '../MessageList/MessageList';
import { Form } from '../Form/Form';
import { Chats } from '../Chats/Chats';
import { Footer } from '../Footer/Footer';


function App() {
	const lesson = 'Урок 3';
	const [messages, setMessages] = useState([]);

	const sendMassage = (author, text) => {
		if (author || text) {
			setMessages((prevMessages) => [...prevMessages, {
				id: nanoid(),
				author: author,
				text: text,
			}]);
		}
	}

	useEffect(() => {
		if (messages.length && messages[messages.length - 1].author !== 'BOT') {
			const timeout = setTimeout(
				() =>
					sendMassage('BOT', 'Im BOT'),
				1000
			);

			return () => {
				clearTimeout(timeout);
			};
		}
	}, [messages]);


	return (
		<div className={style.root}>
			<Header lesson={lesson} />
			<main className={style.main + " container"}>
				{/* <Message content={'Все задания выполнены'} /> */}
				<Form addMessage={sendMassage} />
				<MessageList message={messages} />
				<Chats message={messages} />
			</main>
			<Footer />
		</div>
	);
}

export default App;
