import style from './Message.module.scss';
import img from './five.png';

export const Message = (props) => {
	const a = 'sfasdff';
	return (
		<>
			<div className={style.message__wrap + " container"}>
				<p className={style.message__text}>{props.content}</p>
				<p className={style.message__text}>{a}</p>
				<img src={img} alt="iae" width="80%" height="auto"></img>
			</div>
		</>
	);
}