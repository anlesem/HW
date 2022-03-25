import { Link } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';

import { getProfileName, getProfileLogin } from '../../store/profile/selectors';

import style from './Profile.module.scss';

import Button from '@mui/material/Button';
import { logOut } from '../../services/firebase';

export const Profile = () => {
  const name = useSelector(getProfileName, shallowEqual);
  const login = useSelector(getProfileLogin, shallowEqual);

  const handleClick = async () => {
    logOut();
  };

  return (
    <div className={style.main}>
      <h1 className={style.head}>{name}</h1>
      {login ? (
        <Button variant="outlined" data-testid={'profile-form-button'} onClick={handleClick}>
          Выйти
        </Button>
      ) : (
        <div>
          <Link to="sign">
            <Button variant="outlined" data-testid={'profile-form-button'}>
              Войти
            </Button>
          </Link>
          <Link to="sign/reg">
            <Button variant="outlined" data-testid={'profile-form-button'}>
              Регистрация
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};
