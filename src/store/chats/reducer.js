import { ADD_CHAT, RENAME_CHAT, DELETE_CHAT } from './actions';

const initialState = {
  counterID: 1,
  chatList: [
    {
      id: 1,
      name: 'чат 1'
    }
  ]
};

export const chatsReducer = (state = initialState, Action) => {
  switch (Action.type) {
    case ADD_CHAT:
      return {
        ...state,
        chatList: [
          ...state.chatList,
          {
            id: state.counterID + 1,
            name: `чат ${state.counterID + 1}`
          }
        ],
        counterID: state.counterID + 1
      };
    case RENAME_CHAT:
      return {
        ...state,
        chatList: state.chatList.map((item) =>
          item.id === Action.id ? { ...item, name: `${Action.value}` } : item
        )
      };
    case DELETE_CHAT:
      return {
        ...state,
        chatList: state.chatList.filter(({ id }) => id !== Action.id)
      };
    default:
      return state;
  }
};
