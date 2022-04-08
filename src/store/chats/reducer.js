import { CHANGE_COUNTER, SET_CHAT, RENAME_CHAT } from './actions';

const initialState = {
  counterID: 0,
  chatList: []
};

export const chatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_COUNTER:
      return {
        ...state,
        counterID: action.id
      };
    case SET_CHAT:
      return {
        ...state,
        chatList: action.payload
      };
    case RENAME_CHAT:
      return {
        ...state,
        chatList: state.chatList.map((item) =>
          item.id === action.id ? { ...item, name: action.value } : item
        )
      };
    default:
      return state;
  }
};
