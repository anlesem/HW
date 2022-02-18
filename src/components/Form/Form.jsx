import { useState } from 'react';

import style from './Form.module.scss';

export const Form = ({ addMessage }) => {
   const [text, setText] = useState('');
   const handleSubmit = (event) => {
      event.preventDefault();
      // text, event для разнообразия, но лучше не использовать
      addMessage(text, event);
      setText('');
   }
   return (
      <form className={style.form} onSubmit={handleSubmit}>
         <input type='text' value={text} name='author' placeholder='ФИО' className={style.form_author} onChange={event => setText(event.target.value)}></input>
         <textarea name='text' className={style.form_text}></textarea>
         <button className={style.form_button}>Отправить</button>
      </form>
   );
}