import { useRef, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import { getTempInput } from '../../store/messages/selectors';
import { changeTempInput } from '../../store/messages/actions';

import style from './MessageForm.module.scss';

import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';

export const MessageForm = ({ formData }) => {
  const dispatch = useDispatch();
  const tempInput = useSelector(getTempInput, shallowEqual);
  const focusForm = useRef(null);
  const chatId = +formData.chatId;
  const input = tempInput[chatId];

  const handleSubmit = (event) => {
    event.preventDefault();
    if (input) {
      formData.sendMassage(input);
      dispatch(changeTempInput(chatId, ''));
    }
  };

  const handleInput = (value) => {
    dispatch(changeTempInput(chatId, value));
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  useEffect(() => {
    focusForm.current.focus();
  });

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <TextField
        id="outlined-multiline-static"
        name="text"
        label="Текст сообщения"
        multiline
        rows={2}
        value={input}
        onChange={(event) => handleInput(event.target.value)}
        onKeyDown={(event) => handleKeyDown(event)}
        inputRef={focusForm}
        disabled={formData.chatId > 0 ? false : true}
        required
        inputProps={{ 'data-testid': 'message-form-input' }}
        className={style.textField}
      />
      <Button
        variant="outlined"
        type="submit"
        disabled={formData.chatId > 0 ? false : true}
        data-testid="message-form-button">
        <SendIcon />
      </Button>
    </form>
  );
};
