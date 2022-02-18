import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import style from './App.module.scss';

import { Header } from '../Header/Header';
// import { Message } from '../Message/Message';
import { MessageList } from '../MessageList/MessageList';
import { Form } from '../Form/Form';
import { Footer } from '../Footer/Footer';


function App() {
	const [messages, setMessages] = useState([]);
	// const robotRef = useRef(null);

	// text, event для разнообразия, но лучше не использовать
	const sendMassage = (text, event) => {
		if (event.target.elements.author.value || event.target.elements.text.value) {
			setMessages([...messages, {
				id: nanoid(),
				author: text,
				text: event.target.elements.text.value,
			}]);
			// Так делать плохо. Необходимо очищать через setState
			event.target.elements.text.value = '';
		}
		// console.log(messages);	// вернёт старое значение
	}

	useEffect(() => {
		// console.log(messages);	// вернёт новое значение
	}, [messages]);


	return (
		<div className={style.root}>
			<Header />
			<main className="container">
				{/* <Message content={'Все задания выполнены'} /> */}
				<Form addMessage={sendMassage} />
				<MessageList message={messages} />
			</main>
			<Footer />
		</div>
	);
}

export default App;
