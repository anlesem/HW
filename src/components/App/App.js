import { useState, useEffect, useRef } from 'react';

import style from './App.module.scss';

import { Header } from '../Header/Header';
// import { Message } from '../Message/Message';
import { Footer } from '../Footer/Footer';


function App() {
	const [messageList, setMessageList] = useState([]);
	const robotRef = useRef(null);

	const handleClick = (event) => {
		event.preventDefault();
		if (event.target.form.elements.author.value || event.target.form.elements.text.value) {
			setMessageList([...messageList, {
				author: event.target.form.elements.author.value,
				text: event.target.form.elements.text.value
			}]);
			event.target.form.elements.author.value = '';
			event.target.form.elements.text.value = '';
		}
	}

	useEffect(() => {
		if (messageList.length > 0) {
			robotRef.current.insertAdjacentHTML('beforeend', '<p>Спасибо за обращение</p>');
		}
	}, [messageList.length]);

	return (
		<div className={style.root}>
			<Header />
			<main className="container">
				{/* <Message content={'Все задания выполнены'} /> */}
				<form action='#' className={style.form}>
					<input type='text' name='author' placeholder='ФИО' className={style.form_author}></input>
					<textarea name='text' className={style.form_text}></textarea>
					<button className={style.form_button} onClick={(event) => handleClick(event)}>Отправить</button>
				</form>
				<ul className={style.messageList}>Результат: {messageList.map((item, idx) => {
					return <li key={idx} ref={robotRef} className={style.message}>
						<p className={style.message_text}>{item.text}</p>
						<p className={style.message_author}>{item.author}</p>
					</li>;
				})}
				</ul>
			</main>
			<Footer />
		</div>
	);
}

export default App;
