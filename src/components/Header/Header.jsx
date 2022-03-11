import { NavBar } from '../../components/NavBar/NavBar';

import style from './Header.module.scss';

export const Header = (props) => {
  return (
    <header className={style.header}>
      <div className={style.wrap + ' container'}>
        <h1>{props.lesson}</h1>
        <NavBar />
      </div>
    </header>
  );
};
