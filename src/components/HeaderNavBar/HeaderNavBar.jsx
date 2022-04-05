import { NavLink } from 'react-router-dom';
import { GLOBAL } from '../../GlobalData';

import style from './HeaderNavBar.module.scss';

export const HeaderNavBar = () => {
  return (
    <ul className={style.navbar}>
      {GLOBAL.navigate.map((link) => {
        return (
          <li key={link.id}>
            <NavLink
              to={link.to}
              className={({ isActive }) => (isActive ? style.active : '')}
              data-testid={`NavLink-${link.id}`}>
              <button>
                {link.icon}
                {link.name}
              </button>
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};
