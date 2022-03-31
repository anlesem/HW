import {
  SET_MESSAGE_LIST,
  ADD_MESSAGE,
  INIT_MESSAGE_LIST,
  INIT_TEMP_INPUT,
  CHANGE_TEMP_INPUT,
  RESET_TEMP_INPUT
} from './actions';

const initialState = {
  messageList: {},
  tempInput: ['']
};

export const messagesReducer = (state = initialState, Action) => {
  switch (Action.type) {
    case SET_MESSAGE_LIST:
      return {
        ...state,
        messageList: Action.payload
      };
    case INIT_MESSAGE_LIST:
      return {
        ...state,
        messageList: {
          ...state.messageList,
          [`${Action.chatId}`]: Action.payload
        }
      };
    case ADD_MESSAGE:
      return {
        ...state,
        messageList: {
          ...state.messageList,
          [`${Action.chatId}`]: [
            ...state.messageList[`chat${Action.chatId}`],
            {
              id: Action.id,
              author: Action.author,
              text: Action.text
            }
          ]
        }
      };
    case INIT_TEMP_INPUT:
      return {
        ...state,
        tempInput: [...state.tempInput, '']
      };
    case RESET_TEMP_INPUT:
      return {
        ...state,
        tempInput: ['']
      };
    case CHANGE_TEMP_INPUT:
      return {
        ...state,
        tempInput: [
          ...state.tempInput.slice(0, Action.id),
          Action.value,
          ...state.tempInput.slice(Action.id + 1)
        ]
      };
    default:
      return state;
  }
};
