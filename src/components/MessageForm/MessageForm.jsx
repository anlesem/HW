import { useState, useRef, useEffect } from 'react';

import style from './MessageForm.module.scss';

import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';

export const MessageForm = ({ formData }) => {
   const [text, setText] = useState('');
   const [textInput, setTextInput] = useState([]);
   const focusForm = useRef(null);

   const handleSubmit = (event) => {
      event.preventDefault();
      if (text) {
         formData.sendMassage(text);
         setText('');
         arrTextInput('');
      }
   };

   const handleInput = (value) => {
      setText(value);
      arrTextInput(value);
   };

   const handleKeyDown = (event) => {
      if (event.keyCode === 13 && !event.shiftKey) {
         event.preventDefault();
         handleSubmit(event);
      }
   };

   const arrTextInput = (value) => {
      let update = [...textInput];
      update[formData.chatId] = value;
      setTextInput(update);
   };

   useEffect(() => {
      if (textInput[formData.chatId] || textInput[formData.chatId] === '')
         setText(textInput[formData.chatId]);
      else setText('');
   }, [formData.chatId, textInput]);

   useEffect(() => {
      focusForm.current.focus();
   });

   return (
      <form className={style.form} onSubmit={handleSubmit}>
         <TextField
            id="outlined-multiline-static"
            name="text"
            label="Текст сообщения"
            multiline
            rows={2}
            value={text}
            onChange={(event) => handleInput(event.target.value)}
            onKeyDown={(event) => handleKeyDown(event)}
            inputRef={focusForm}
            disabled={formData.chatId > 0 ? false : true}
            required
            inputProps={{ 'data-testid': 'message-form-input' }}
            className={style.textField}
         />
         <Button
            variant="outlined"
            type="submit"
            disabled={formData.chatId > 0 ? false : true}
            data-testid="message-form-button">
            <SendIcon />
         </Button>
      </form>
   );
};
