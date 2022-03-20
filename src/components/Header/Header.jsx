import PropTypes from 'prop-types';

import style from './Header.module.scss';

import { NavBar } from '../../components/NavBar/NavBar';

export const Header = ({ lesson }) => {
  return (
    <div className={style.wrap + ' container'}>
      <h1>{lesson}</h1>
      <NavBar />
    </div>
  );
};

Header.propTypes = {
  lesson: PropTypes.string.isRequired
};
