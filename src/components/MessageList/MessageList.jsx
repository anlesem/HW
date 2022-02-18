import style from './MessageList.module.scss';

export const MessageList = (props) => {

   return (
      <ul className={style.messages}>Результат: {props.message.map((item) => {
         return <li key={item.id} className={style.message}>
            <p className={style.message_text}>{item.text}</p>
            <p className={style.message_author}>{item.author}</p>
         </li>;
      })}
      </ul>
   );
}