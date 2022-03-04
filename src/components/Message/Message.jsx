import { useState, useEffect, useCallback } from 'react';
import { nanoid } from 'nanoid';

import { MessageList } from '../../components/MessageList/MessageList';
import { MessageForm } from '../MessageForm/MessageForm';

import style from './Message.module.scss';

const defaultMessages = {
	chat0: [
		{
			id: '0',
			author: 'BOT',
			text: 'Выберите чат для отображения сообщений',
		},
	],
	chat1: [
		{
			id: '1',
			author: 'BOT',
			text: 'Добро пожаловать в чат №1',
		},
	],
	chat2: [
		{
			id: '1',
			author: 'BOT',
			text: 'Добро пожаловать в чат №2',
		},
	],
	chat3: [
		{
			id: '1',
			author: 'BOT',
			text: 'Добро пожаловать в чат №3',
		},
	],
};

export const Message = ({ chatId }) => {
	const [messages, setMessages] = useState(defaultMessages);

	const sendMassage = useCallback((text, author = 'User', id = nanoid()) => {
		setMessages((prevMessages) => ({
			...prevMessages,
			[`chat${chatId}`]: [...prevMessages[`chat${chatId}`], {
				id: id,
				author: author,
				text: text,
			}],
		}));
	}, [chatId]);

	useEffect(() => {
		if (!messages[`chat${chatId}`]) {
			setMessages((prevMessages) => ({
				...prevMessages,
				[`chat${chatId}`]: [],
			}));
			sendMassage(`Добро пожаловать в чат №${chatId}`, 'BOT', '1');
		}
	}, [chatId, messages, sendMassage]);

	useEffect(() => {
		if (messages[`chat${chatId}`] && messages[`chat${chatId}`][messages[`chat${chatId}`].length - 1].author !== 'BOT') {
			const timeout = setTimeout(
				() =>
					sendMassage('Im BOT', 'BOT'),
				1000
			);

			return () => {
				clearTimeout(timeout);
			};
		}
	}, [chatId, messages, sendMassage]);

	return (
		<div className={style.wrap}>
			<MessageList message={messages[`chat${chatId}`]} />
			<MessageForm formData={{ chatId, sendMassage }} />
		</div>
	);
}