import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getDataAllThunk } from '../../store/data/actions';
import { getDataError, getDataData, getDataLoad } from '../../store/data/selectors';

import style from './Data.module.scss';

import Button from '@mui/material/Button';
import { ProgressBar } from '../../components/ProgressBar/ProgressBar';

export const Data = () => {
  const data = useSelector(getDataData);
  const load = useSelector(getDataLoad);
  const error = useSelector(getDataError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDataAllThunk());
  }, []);

  return (
    <div className={style.wrap}>
      {load && <ProgressBar />}
      {error && (
        <div className={style.error}>
          <h2 className={style.text}> Ошибка получения данных</h2>
          <Button
            variant="outlined"
            data-testid="data-button-reload"
            onClick={() => dispatch(getDataAllThunk())}>
            Попробовать снова
          </Button>
        </div>
      )}
      <ul className={style.list}>
        {data.map((item, idx) => {
          return (
            <li key={idx} className={style.item} data-testid={'data-item-' + idx}>
              <h2 className={style.title}>{item.title}</h2>
              <p>{item.body}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
