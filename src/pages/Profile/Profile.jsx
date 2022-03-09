import { useSelector, useDispatch } from 'react-redux';
import { toggleVisible } from '../../store/profile/actions';

import style from './Profile.module.scss';

export const Profile = () => {
   const { visible, name } = useSelector((state) => state);
   const dispatch = useDispatch();

   return (
      <div className={style.main}>
         <h1>Профиль</h1>
         <button onClick={() => dispatch(toggleVisible)} >Включить</button>
         <span>{name}</span>
         {visible && <div>{name}</div>}
      </div>
   );
}