import { CHANGE_COUNTER, SET_CHAT, RENAME_CHAT } from './actions';

const initialState = {
  counterID: 0,
  chatList: []
};

export const chatsReducer = (state = initialState, Action) => {
  switch (Action.type) {
    case CHANGE_COUNTER:
      return {
        ...state,
        counterID: Action.id
      };
    case SET_CHAT:
      return {
        ...state,
        chatList: Action.payload
      };
    case RENAME_CHAT:
      return {
        ...state,
        chatList: state.chatList.map((item) =>
          item.id === Action.id ? { ...item, name: Action.value } : item
        )
      };
    default:
      return state;
  }
};
