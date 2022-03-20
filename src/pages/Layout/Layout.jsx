import { Outlet } from 'react-router-dom';

import style from './Layout.module.scss';

import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';

export const Layout = ({ lesson }) => {
  return (
    <div className={style.wrap}>
      <header className={style.header}>
        <Header lesson={lesson} />
      </header>
      <main className={style.main}>
        <Outlet />
      </main>
      <footer className={style.footer}>
        <Footer />
      </footer>
    </div>
  );
};
