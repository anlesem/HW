import { useState, useRef, useEffect } from 'react';

import style from './Form.module.scss';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export const Form = ({ addMessage }) => {
   const [author, setAuthor] = useState('');
   const [text, setText] = useState('');
   const myRef = useRef(null);
   const handleSubmit = (event) => {
      event.preventDefault();
      // text, event для разнообразия, но лучше не использовать
      addMessage(author, text);
      setAuthor('');
      setText('');
   }
   useEffect(() => {
      myRef.current.focus();
   }, [author]);


   return (
      <form className={style.form} onSubmit={handleSubmit}>
         <TextField id="outlined-required" name="author" label="ФИО. Обязательно" variant="outlined" value={author} onChange={event => setAuthor(event.target.value)} inputRef={myRef} required />
         <TextField id="outlined-multiline-static" name="text" label="Текст сообщения" sx={{ mt: 2 }} multiline rows={4} value={text} onChange={event => setText(event.target.value)} />
         <Button variant="outlined" type="submit" sx={{ mt: 2 }}>Отправить</Button>
      </form>
   );
}