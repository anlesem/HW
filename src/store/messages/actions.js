import { get, onValue, remove, set, update } from 'firebase/database';
import { getMessagesById, getMessagesListById, messagesRef } from '../../services/firebase';

export const SET_MESSAGE_LIST = 'MESSAGE::SET_MESSAGE_LIST';
export const INIT_MESSAGE = 'MESSAGE::INIT_MESSAGE';
export const ADD_MESSAGE = 'MESSAGE::ADD_MESSAGE';
export const CHANGE_MESSAGE = 'MESSAGE::CHANGE_MESSAGE';
export const DELETE_MESSAGE = 'MESSAGE::DELETE_MESSAGE';
export const RESET_MESSAGE_LIST = 'MESSAGE::RESET_MESSAGE_LIST';

export const INIT_COUNTER_MSG = 'MESSAGE::INIT_COUNTER_MSG';
export const CHANGE_COUNTER_MSG = 'MESSAGE::CHANGE_COUNTER_MSG';
export const RESET_COUNTER_MSG = 'MESSAGE::RESET_COUNTER_MSG';

export const INIT_TEMP_INPUT = 'MESSAGE::INIT_TEMP_INPUT';
export const RESET_TEMP_INPUT = 'MESSAGE::RESET_TEMP_INPUT';
export const CHANGE_TEMP_INPUT = 'MESSAGE::CHANGE_TEMP_INPUT';

export const setMessageList = (chatId, payload) => ({
  type: SET_MESSAGE_LIST,
  chatId,
  payload
});

export const initMessage = (chatId, payload) => ({
  type: INIT_MESSAGE,
  chatId,
  payload
});

export const addMessage = (chatId, payload) => ({
  type: ADD_MESSAGE,
  chatId,
  payload
});

export const changeMessage = (chatId, id, value) => ({
  type: CHANGE_MESSAGE,
  chatId: +chatId,
  id,
  value
});

export const deleteMessage = (chatId, payload) => ({
  type: DELETE_MESSAGE,
  chatId,
  payload
});

export const resetMessageList = {
  type: RESET_MESSAGE_LIST
};

export const setMessageDataThunk = () => (dispatch) => {
  get(messagesRef).then((snapshot) => {
    if (snapshot.val()) {
      for (let property in snapshot.val()) {
        const newMessageList = [];
        for (let prop in snapshot.val()[property]) {
          newMessageList.push(snapshot.val()[property][prop]);
        }
        dispatch(setMessageList(property, newMessageList));
        dispatch(initCounterMSG(newMessageList.length));
        dispatch(initTempInput);
      }
    }
  });
};

export const initMessageThunk = (chatId) => (dispatch) => {
  set(getMessagesById(chatId), {});
  set(getMessagesListById(chatId, 0), {
    id: `ch${chatId}-msg1`,
    author: 'BOT',
    text: `Добро пожаловать в чат №${chatId}`
  });
  onValue(
    getMessagesListById(chatId, 0),
    (snapshot) => {
      dispatch(initMessage(chatId, snapshot.val()));
    },
    {
      onlyOnce: true
    }
  );
  dispatch(initCounterMSG(1));
  dispatch(initTempInput);
};

let timerId;

export const addMessageThunk = (message) => (dispatch) => {
  let counterMSG = message.counterMSG + 1;
  set(getMessagesListById(message.chatId, counterMSG), {
    id: `ch${message.chatId}-msg${counterMSG}`,
    author: message.name,
    text: message.text
  });
  onValue(getMessagesListById(message.chatId, counterMSG), (snapshot) => {
    dispatch(changeCounterMSG(message.chatId, counterMSG));
    dispatch(addMessage(message.chatId, snapshot.val()));
  });

  if (message.author !== 'BOT') {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      let msgId = counterMSG + 1;
      set(getMessagesListById(message.chatId, msgId), {
        id: `ch${message.chatId}-msg${msgId}`,
        author: 'BOT',
        text: 'I am bot'
      });
      onValue(getMessagesListById(message.chatId, msgId), (snapshot) => {
        dispatch(changeCounterMSG(message.chatId, msgId));
        dispatch(addMessage(message.chatId, snapshot.val()));
      });
    }, 1000);
  }
};

export const changeInitMessageThunk = (chatId, newChatName) => (dispatch) => {
  let id = `ch${chatId}-msg1`;
  update(getMessagesListById(chatId, 0), {
    id,
    author: 'BOT',
    text: `Добро пожаловать в чат ${newChatName}`
  });
  onValue(getMessagesListById(chatId, 0), (snapshot) => {
    if (snapshot.val()) {
      dispatch(changeMessage(chatId, id, snapshot.val().text));
    }
  });
};

export const deleteMessagesListThunk = (chatId) => (dispatch) => {
  const date = new Date();
  if (chatId > 0) {
    remove(getMessagesById(chatId));
    set(getMessagesById(chatId), {});
    set(getMessagesListById(chatId, 0), {
      id: `ch${chatId}-msg1`,
      author: 'BOT',
      text: `Чат был удалён ${date.toLocaleString()}`
    });
    onValue(getMessagesListById(chatId, 0), (snapshot) => {
      dispatch(initMessage(chatId, snapshot.val()));
    });
  }
};

export const unsetMessageDataThunk = () => (dispatch) => {
  dispatch(resetMessageList);
  dispatch(resetCounterMSG);
  dispatch(resetTempInput);
};

export const initCounterMSG = (counterMSG) => ({
  type: INIT_COUNTER_MSG,
  counterMSG
});

export const changeCounterMSG = (id, counter) => ({
  type: CHANGE_COUNTER_MSG,
  id: +id,
  counter
});

export const resetCounterMSG = {
  type: RESET_COUNTER_MSG
};

export const initTempInput = {
  type: INIT_TEMP_INPUT
};

export const changeTempInput = (id, value) => ({
  type: CHANGE_TEMP_INPUT,
  id: +id,
  value
});

export const resetTempInput = {
  type: RESET_TEMP_INPUT
};
