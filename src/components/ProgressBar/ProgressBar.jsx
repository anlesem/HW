import style from './ProgressBar.module.scss';

import LinearProgress from '@mui/material/LinearProgress';

export const ProgressBar = () => {
  return (
    <div className={style.wrap}>
      <LinearProgress className={style.progress} />
    </div>
  );
};
