import style from './Message.module.scss';

export const Message = (props) => {

	return (
		<>
			<p className={style.message}>{props.content}</p>
		</>
	);
}