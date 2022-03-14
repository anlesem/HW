import { ADD_MESSAGE, INIT_MESSAGE_LIST, INIT_TEMP_INPUT, CHANGE_TEMP_INPUT } from './actions';

const initialState = {
  messageList: {
    chat0: [
      {
        id: '0',
        author: 'BOT',
        text: 'Выберите чат для отображения сообщений'
      }
    ],
    chat1: [
      {
        id: '1',
        author: 'BOT',
        text: 'Добро пожаловать в чат №1'
      }
    ]
  },
  tempInput: ['', '']
};

export const messagesReducer = (state = initialState, Action) => {
  switch (Action.type) {
    case INIT_MESSAGE_LIST:
      return {
        ...state,
        messageList: {
          ...state.messageList,
          [`chat${Action.chatId}`]: [
            {
              id: '1',
              author: 'BOT',
              text: `Добро пожаловать в чат №${Action.chatId}`
            }
          ]
        }
      };
    case ADD_MESSAGE:
      return {
        ...state,
        messageList: {
          ...state.messageList,
          [`chat${Action.chatId}`]: [
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
