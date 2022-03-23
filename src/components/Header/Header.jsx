import { GLOBAL } from '../../GlobalData';
import style from './Header.module.scss';

import { NavBar } from '../../components/NavBar/NavBar';

export const Header = () => {
  return (
    <div className={style.wrap + ' container'}>
      <h1>{GLOBAL.lesson}</h1>
      <NavBar />
    </div>
  );
};
