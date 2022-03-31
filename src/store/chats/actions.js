import { onValue, remove, set, update } from 'firebase/database';
import { chatsRef, getChatListById } from '../../services/firebase';

export const CHANGE_COUNTER = 'CHATS::CHANGE_COUNTER';
export const SET_CHAT = 'CHATS::SET_CHAT';
export const RENAME_CHAT = 'CHATS::RENAME_CHAT';
export const DELETE_CHAT = 'CHATS::DELETE_CHAT';

export const changeCounterId = (id) => ({
  type: CHANGE_COUNTER,
  id
});

export const setChat = (payload) => ({
  type: SET_CHAT,
  payload
});

export const renameChat = (id, text) => ({
  type: RENAME_CHAT,
  id: id,
  value: text
});

export const deleteChat = (id) => ({
  type: DELETE_CHAT,
  id: id
});

export const addChatThunk = (id) => () => {
  update(chatsRef, {
    counterId: id
  });
  set(getChatListById(id), {
    id,
    name: `чат ${id}`
  });
  setChatsDataThunk();
};

export const renameChatThunk = (id, text) => (dispatch) => {
  update(getChatListById(id), {
    id,
    name: text
  });
  onValue(chatsRef, (snapshot) => {
    snapshot.forEach((shot) => {
      if (shot.val().id === id) dispatch(renameChat(id, shot.val().name));
    });
  });
};

export const deleteChatThunk = (id) => () => {
  remove(getChatListById(id));
  setChatsDataThunk();
};

export const setChatsDataThunk = () => (dispatch) => {
  onValue(chatsRef, (snapshot) => {
    const newChats = [];
    snapshot.forEach((shot) => {
      if (shot.val().id) newChats.push(shot.val());
    });
    dispatch(setChat(newChats));
    dispatch(changeCounterId(snapshot.val().counterId));
  });
};

export const unsetChatsDataThunk = () => (dispatch) => {
  const offChats = [];
  dispatch(setChat(offChats));
  dispatch(changeCounterId(0));
};
