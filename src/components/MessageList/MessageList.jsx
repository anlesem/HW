import style from './MessageList.module.scss';

export const MessageList = ({ message }) => {

   return (
      <ul>
         {!message ? '' : message.map((item, idx) => {
            return <li key={item.id} className={style.message} data-testid={'list-item-' + idx}>
               <p className={style.message_text}>{item.text}</p>
               <p className={style.message_author}>{item.author}</p>
            </li>;
         })}
      </ul>
   );
}