import { useState } from 'react';
import { logIn, signUp } from '../../services/firebase';

import style from './Sign.module.scss';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useLocation, useNavigate, useParams } from 'react-router';

export const Sign = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || '/';

  const { reg } = useParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      if (reg) await signUp(email, password);
      else await logIn(email, password);
      navigate(fromPage, { replace: true });
    } catch (err) {
      setError(() => err.message);
    }
  };

  return (
    <div className={style.wrap}>
      <h3 className={style.head}>Авторизация</h3>
      {reg ? <h4>Регистрация</h4> : <h4>Вход</h4>}
      <form className={style.form} onSubmit={(event) => handleSubmit(event)}>
        <TextField
          id="outlined-basic_"
          variant="outlined"
          type="email"
          name="email"
          label="E-mail"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          inputProps={{ 'data-testid': 'sign-email' }}
          className={style.textField}
        />
        <TextField
          id="outlined-basic"
          variant="outlined"
          type="password"
          name="password"
          label="Пароль"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          inputProps={{ 'data-testid': 'sign-password' }}
          className={style.textField}
        />
        <Button variant="outlined" type="submit" data-testid={'sign-submit'}>
          {reg ? 'Зарегистрироваться' : 'Войти'}
        </Button>
      </form>
      <div className={style.error}>{error}</div>
    </div>
  );
};
