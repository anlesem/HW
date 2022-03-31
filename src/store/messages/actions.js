import { get, onValue, set } from 'firebase/database';
import { nanoid } from 'nanoid';
import { getMessagesById, getMessagesListById, messagesRef } from '../../services/firebase';

export const SET_MESSAGE_LIST = 'MESSAGE::SET_MESSAGE_LIST';
export const INIT_MESSAGE_LIST = 'MESSAGE::INIT_MESSAGE_LIST';
export const ADD_MESSAGE = 'MESSAGE::ADD_MESSAGE';

export const INIT_TEMP_INPUT = 'MESSAGE::INIT_TEMP_INPUT';
export const RESET_TEMP_INPUT = 'MESSAGE::RESET_TEMP_INPUT';
export const CHANGE_TEMP_INPUT = 'MESSAGE::CHANGE_TEMP_INPUT';

export const setMessageList = (payload) => ({
  type: SET_MESSAGE_LIST,
  payload
});

export const initMessageList = (chatId, payload) => ({
  type: INIT_MESSAGE_LIST,
  chatId,
  payload
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

export const initMessageListThunk = (chatId) => (dispatch) => {
  set(getMessagesById(chatId), {});
  set(getMessagesListById(chatId, 1), {
    id: '1',
    author: 'BOT',
    text: `Добро пожаловать в чат №${chatId}`
  });
  onValue(messagesRef, (snapshot) => {
    dispatch(initMessageList(chatId, snapshot.val()[chatId]));
  });
  dispatch(initTempInput);
};

export const setMessageDataThunk = () => (dispatch) => {
  get(messagesRef).then((snapshot) => {
    dispatch(setMessageList(snapshot.val()));
    for (let i = 1; i < snapshot.val().length; i++) {
      dispatch(initTempInput);
    }
  });
};

export const unsetMessageDataThunk = () => (dispatch) => {
  dispatch(setMessageList({}));
  dispatch(resetTempInput);
};

export const initTempInput = {
  type: INIT_TEMP_INPUT
};

export const resetTempInput = {
  type: RESET_TEMP_INPUT
};

export const changeTempInput = (id, text) => ({
  type: CHANGE_TEMP_INPUT,
  id: id,
  value: text
});
