import style from './ProfileButtons.module.scss';

import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export const ProfileButtons = () => {
  return (
    <div className={style.buttons}>
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
  );
};
