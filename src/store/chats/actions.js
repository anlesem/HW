export const ADD_CHAT = 'CHATS::ADD_CHAT';
export const RENAME_CHAT = 'CHATS::RENAME_CHAT';
export const DELETE_CHAT = 'CHATS::DELETE_CHAT';

export const addChat = {
  type: ADD_CHAT
};

export const renameChat = (text) => ({
  type: RENAME_CHAT,
  value: text
});

export const deleteChat = {
  type: DELETE_CHAT
};
