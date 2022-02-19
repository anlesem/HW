import style from './Header.module.scss';

export const Header = (props) => {

	return (
		<header className={style.header}>
			<div className={style.header__wrap + ' container'}>
				<h1>{props.lesson}</h1>
			</div>
		</header>
	);
}