import { nanoid } from 'nanoid';

export const ADD_MESSAGE = 'MESSAGE::ADD_MESSAGE';

export const addMessage = (chatId, message, author = 'User', id = nanoid()) => ({
  type: ADD_MESSAGE,
  chatId: chatId,
  id: id,
  author: author,
  message: message
});
