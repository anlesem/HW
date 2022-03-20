import { nanoid } from 'nanoid';

export const INIT_MESSAGE_LIST = 'MESSAGE::INIT_MESSAGE_LIST';
export const ADD_MESSAGE = 'MESSAGE::ADD_MESSAGE';

export const INIT_TEMP_INPUT = 'MESSAGE::INIT_TEMP_INPUT';
export const CHANGE_TEMP_INPUT = 'MESSAGE::CHANGE_TEMP_INPUT';

export const initMessageList = (chatId) => ({
  type: INIT_MESSAGE_LIST,
  chatId: chatId
});

export const addMessage = (message) => ({
  type: ADD_MESSAGE,
  chatId: message.chatId,
  id: nanoid(),
  author: message.author,
  text: message.text
});

let timerId;

export const addMessageThunk = (message) => (dispatch) => {
  dispatch(addMessage(message));

  if (message.author !== 'BOT') {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(
      () =>
        dispatch(
          addMessage({
            chatId: message.chatId,
            text: 'I am bot',
            author: 'BOT'
          })
        ),
      1000
    );
  }
};

export const initTempInput = {
  type: INIT_TEMP_INPUT
};

export const changeTempInput = (id, text) => ({
  type: CHANGE_TEMP_INPUT,
  id: id,
  value: text
});
