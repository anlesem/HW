import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import style from './ChatForm.module.scss';

import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';

export const ChatForm = ({ data }) => {
  const [text, setText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (text) {
      data.changeNameChat(text);
      setText('');
    }
  };

  const handleInput = (value) => {
    setText(value);
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  useEffect(() => {
    setText('');
  }, [data.checked]);

  return (
    <form className={style.rename} onSubmit={handleSubmit}>
      <TextField
        id="outlined-basic"
        name="chat"
        label="Название чата"
        variant="outlined"
        value={text}
        onChange={(event) => handleInput(event.target.value)}
        onKeyDown={(event) => handleKeyDown(event)}
        required
        inputProps={{ 'data-testid': 'chat-form-input' }}
        className={style.textField}
      />
      <Button variant="outlined" type="submit" data-testid="chat-form-button">
        <SendIcon />
      </Button>
    </form>
  );
};

ChatForm.propTypes = {
  data: PropTypes.shape({
    checked: PropTypes.array.isRequired,
    changeNameChat: PropTypes.func.isRequired
  })
};
