import {
  SET_MESSAGE_LIST,
  INIT_MESSAGE,
  ADD_MESSAGE,
  CHANGE_MESSAGE,
  DELETE_MESSAGE,
  RESET_MESSAGE_LIST,
  INIT_COUNTER_MSG,
  CHANGE_COUNTER_MSG,
  RESET_COUNTER_MSG,
  INIT_TEMP_INPUT,
  CHANGE_TEMP_INPUT,
  RESET_TEMP_INPUT
} from './actions';

const initialState = {
  messageList: {},
  counterMSG: [''],
  tempInput: ['']
};

export const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGE_LIST:
      return {
        ...state,
        messageList: {
          ...state.messageList,
          [action.chatId]: action.payload
        }
      };
    case INIT_MESSAGE:
      return {
        ...state,
        messageList: {
          ...state.messageList,
          [action.chatId]: [action.payload]
        }
      };
    case ADD_MESSAGE:
      return {
        ...state,
        messageList: {
          ...state.messageList,
          [action.chatId]: [...state.messageList[action.chatId], action.payload]
        }
      };
    case CHANGE_MESSAGE:
      return {
        ...state,
        messageList: {
          ...state.messageList,
          [action.chatId]: state.messageList[action.chatId].map((item) =>
            item.id === action.id ? { ...item, text: action.value } : item
          )
        }
      };
    case DELETE_MESSAGE:
      return {
        ...state,
        messageList: {
          ...state.messageList,
          [action.chatId]: action.payload
        }
      };
    case RESET_MESSAGE_LIST:
      return {
        ...state,
        messageList: {}
      };
    case INIT_COUNTER_MSG:
      return {
        ...state,
        counterMSG: [...state.counterMSG, action.counterMSG]
      };
    case CHANGE_COUNTER_MSG:
      return {
        ...state,
        counterMSG: [
          ...state.counterMSG.slice(0, action.id),
          action.counter,
          ...state.counterMSG.slice(action.id + 1)
        ]
      };
    case RESET_COUNTER_MSG:
      return {
        ...state,
        counterMSG: ['']
      };
    case INIT_TEMP_INPUT:
      return {
        ...state,
        tempInput: [...state.tempInput, '']
      };
    case CHANGE_TEMP_INPUT:
      return {
        ...state,
        tempInput: [
          ...state.tempInput.slice(0, action.id),
          action.value,
          ...state.tempInput.slice(action.id + 1)
        ]
      };
    case RESET_TEMP_INPUT:
      return {
        ...state,
        tempInput: ['']
      };
    default:
      return state;
  }
};
