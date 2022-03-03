import { useState, useRef, useEffect } from 'react';

import style from './Form.module.scss';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';

export const Form = ({ formData }) => {
   const [text, setText] = useState('');
   const [textInput, setTextInput] = useState([]);
   const myRef = useRef(null);

   const handleSubmit = (event) => {
      event.preventDefault();
      if (text) {
         formData.sendMassage(text);
         setText('');
         arrTextInput('');
      }
   }

   const handleInput = (value) => {
      if (value) {
         setText(value);
         arrTextInput(value);
      }
   }

   const handleKeyDown = (event) => {
      if (event.keyCode === 13) {
         event.preventDefault();
         handleSubmit(event);
      }
   }

   const arrTextInput = (value) => {
      let update = [...textInput];
      update[formData.chatId] = value;
      setTextInput(update);
   }

   useEffect(() => {
      if (textInput[formData.chatId] || textInput[formData.chatId] === '') setText(textInput[formData.chatId]);
      else setText('');
   }, [formData.chatId, textInput]);


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
            multiline rows={2}
            value={text}
            onChange={event => handleInput(event.target.value)}
            onKeyDown={event => handleKeyDown(event)}
            inputRef={myRef}
            disabled={formData.chatId > 0 ? false : true}
            required
            inputProps={{ "data-testid": "form-input" }}
            className={style.textField}
         />
         <Button
            variant="outlined"
            type="submit"
            sx={{ mt: 2 }}
            disabled={formData.chatId > 0 ? false : true}
            data-testid='form-button'>
            <SendIcon />
         </Button>
      </form>
   );
}