import style from './Header.module.scss';

export const Header = () => {

	return (
		<header className={style.header}>
			<div className={style.header__wrap + ' container'}>
				<h1>Урок 2</h1>
			</div>
		</header>
	);
}