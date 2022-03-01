import { useState, useRef, useEffect } from 'react';

import style from './Form.module.scss';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export const Form = ({ formData }) => {
   const [text, setText] = useState('');
   const myRef = useRef(null);

   const handleSubmit = (event) => {
      event.preventDefault();
      formData.sendMassage(text);
      setText('');
   }

   useEffect(() => {
      myRef.current.focus();
   });

   return (
      <form className={style.form} onSubmit={handleSubmit}>
         <TextField
            id="outlined-multiline-static"
            name="text"
            label="Текст сообщения"
            sx={{ mt: 2 }}
            multiline rows={4}
            value={text}
            onChange={event => setText(event.target.value)}
            inputRef={myRef}
            disabled={formData.chatId ? false : true}
            required
            inputProps={{ "data-testid": "form-input" }}
         />
         <Button
            variant="outlined"
            type="submit"
            sx={{ mt: 2 }}
            disabled={formData.chatId ? false : true}
            data-testid='form-button'>Отправить</Button>
      </form>
   );
}