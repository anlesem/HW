import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGistsThunk } from '../../store/gists/actions';

import { getGistsError, getGistsGists, getGistsLoad } from '../../store/gists/selectors';

import style from './Gists.module.scss';

import LinearProgress from '@mui/material/LinearProgress';

export const Gists = () => {
  const gists = useSelector(getGistsGists);
  const load = useSelector(getGistsLoad);
  const error = useSelector(getGistsError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGistsThunk());
  }, []);

  return (
    <div className={style.wrap}>
      {load && <LinearProgress className={style.progress} />}
      {error && <h2 className={style.error}> Ошибка получения данных</h2>}
      <ul className={style.list}>
        {gists.map((item, idx) => {
          return (
            <li key={idx} className={style.item} data-testid={'gists-item-' + idx}>
              <h2 className={style.title}>{item.title}</h2>
              <p className={style.text}>{item.body}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
