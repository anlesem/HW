import { useState } from 'react';
// import { useDispatch } from 'react-redux';
import { logIn, signUp } from '../../services/firebase';

import style from './Sign.module.scss';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate, useParams } from 'react-router';

export const Sign = () => {
  const navigate = useNavigate();

  const { reg } = useParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // dispatch();

    try {
      if (reg) await signUp(email, password);
      else await logIn(email, password);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h3>Авторизация</h3>
      {reg ? <h3>Регистрация</h3> : <h3>Вход</h3>}
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
          inputProps={{ 'data-testid': 'singin-email' }}
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
          inputProps={{ 'data-testid': 'singin-password' }}
          className={style.textField}
        />
        <Button variant="outlined" type="submit" data-testid={'singin-button'}>
          <SendIcon />
        </Button>
      </form>
    </div>
  );
};
