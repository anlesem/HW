import style from './App.module.scss';

import { Header } from '../Header/Header';
import { Message } from '../Message/Message';
import { Footer } from '../Footer/Footer';


function App() {
	return (
		<div className={style.root}>
			<Header />
			<Message content={'Все задания выполнены'} />
			<Footer />
		</div>
	);
}

export default App;
