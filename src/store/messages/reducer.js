import { ADD_MESSAGE } from './actions';

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
  }
};

export const messagesReducer = (state = initialState, Action) => {
  switch (Action.type) {
    case ADD_MESSAGE:
      return {
        ...state,
        messageList: {
          ...state.messageList,
          [`chat${Action.chatId}`]: [
            state.messageList[`chat${Action.chatId}`],
            {
              id: Action.id,
              author: Action.author,
              message: Action.text
            }
          ]
        }
      };
    default:
      return state;
  }
};
