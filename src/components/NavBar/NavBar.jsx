import { NavLink } from 'react-router-dom';

import style from './NavBar.module.scss';

const navigate = [
  {
    id: 1,
    to: '/',
    name: 'Профиль'
  },
  {
    id: 2,
    to: '/chats',
    name: 'Чаты'
  },
  {
    id: 3,
    to: '/gists',
    name: 'Данные'
  }
];

export const NavBar = () => {
  return (
    <ul className={style.navbar}>
      {navigate.map((link) => {
        return (
          <li key={link.id}>
            <NavLink
              to={link.to}
              className={({ isActive }) => (isActive ? style.active : '')}
              data-testid={`NavLink-${link.id}`}>
              {link.name}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};
