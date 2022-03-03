import style from './Footer.module.scss';

const now = new Date().getFullYear().toString();

export const Footer = () => {

	return (
		<footer className={style.footer}>
			<div className={style.wrap + " container"}>
				<p className={style.date} data-testid="footer-paragraph">&copy; {now}</p>
			</div>
		</footer>
	);
}