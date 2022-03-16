import { nanoid } from 'nanoid';

export const INIT_MESSAGE_LIST = 'MESSAGE::INIT_MESSAGE_LIST';
export const ADD_MESSAGE = 'MESSAGE::ADD_MESSAGE';

export const INIT_TEMP_INPUT = 'MESSAGE::INIT_TEMP_INPUT';
export const CHANGE_TEMP_INPUT = 'MESSAGE::CHANGE_TEMP_INPUT';

export const initMessageList = (chatId) => ({
  type: INIT_MESSAGE_LIST,
  chatId: chatId
});

export const addMessage = (chatId, text, author = 'User', id = nanoid()) => ({
  type: ADD_MESSAGE,
  chatId: chatId,
  id: id,
  author: author,
  text: text
});

export const initTempInput = {
  type: INIT_TEMP_INPUT
};

export const changeTempInput = (id, text) => ({
  type: CHANGE_TEMP_INPUT,
  id: id,
  value: text
});
