import './Message.scss';
import img from './five.png';

export const Message = (props) => {

	return (
		<>
			<div className="message__wrap container">
				<p className="message__text">{props.content}</p>
				<img src={img} alt="iae" width="80%" height="auto"></img>
			</div>
		</>
	);
}