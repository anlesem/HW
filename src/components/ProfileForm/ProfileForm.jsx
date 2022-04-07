import style from './ProfileForm.module.scss';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

export const ProfileForm = ({
  visible,
  input,
  setInput,
  handleClick,
  handleSubmit,
  handleKeyDown,
  handleCheck,
  focusForm
}) => {
  return (
    <>
      <FormControlLabel
        control={<Checkbox checked={visible} inputProps={{ 'data-testid': 'profile-check' }} />}
        label="Сменить имя"
        data-testid={'profile-box'}
        onChange={handleCheck}
        className={style.change}
      />
      {visible && (
        <form className={style.form} onSubmit={(event) => handleSubmit(event)}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            name="name"
            label="Новое имя"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => handleKeyDown(event)}
            required
            inputRef={focusForm}
            inputProps={{ 'data-testid': 'profile-form-input' }}
            className={style.textField}
          />
          <Button variant="outlined" type="submit" data-testid={'profile-form-button'}>
            <SendIcon />
          </Button>
        </form>
      )}
      <div className={style.exit}>
        <Button variant="outlined" data-testid={'profile-button-exit'} onClick={handleClick}>
          Выйти
        </Button>
      </div>
    </>
  );
};
