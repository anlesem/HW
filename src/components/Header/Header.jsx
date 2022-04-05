import style from './Header.module.scss';

import { HeaderNavBar } from '../HeaderNavBar/HeaderNavBar';

export const Header = () => {
  return (
    <div className={style.wrap + ' container'}>
      <HeaderNavBar />
    </div>
  );
};
