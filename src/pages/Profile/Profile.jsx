import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleVisible, inputName, changeName } from '../../store/profile/actions';

import style from './Profile.module.scss';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

export const Profile = () => {
   const { visible, input, name } = useSelector((state) => state);
   const dispatch = useDispatch();
   const focusForm = useRef(null);

   const handleSubmit = (event) => {
      event.preventDefault();
      dispatch(changeName);
   }

   const handleInput = (text) => {
      inputName.value = text;
      dispatch(inputName);
   }

   const handleKeyDown = (event) => {
      if (event.keyCode === 13) {
         event.preventDefault();
         handleSubmit(event);
      }
   }

   useEffect(() => {
      if (focusForm.current) focusForm.current.focus();
   });

   return (
      <div className={style.main}>
         <h1 className={style.head}>{name}</h1>
         <FormControlLabel
            control={<Checkbox checked={visible} inputProps={{ "data-testid": "profile-check" }} />}
            label="Авторизоваться"
            data-testid={"profile-box"}
            onChange={() => dispatch(toggleVisible)}
         />
         {visible && <form className={style.form} onSubmit={event => handleSubmit(event)}>
            <TextField
               id="outlined-basic"
               variant="outlined"
               name="login"
               label="Логин"
               value={input}
               onChange={event => handleInput(event.target.value)}
               onKeyDown={event => handleKeyDown(event)}
               required
               inputRef={focusForm}
               inputProps={{ "data-testid": "profile-form-input" }}
               className={style.textField}
            />
            <Button
               variant="outlined"
               type="submit"
               data-testid={"profile-form-button"}>
               <SendIcon />
            </Button></form>}
      </div>
   );
}