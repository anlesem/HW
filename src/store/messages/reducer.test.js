import { ADD_MESSAGE, INIT_MESSAGE_LIST, INIT_TEMP_INPUT, CHANGE_TEMP_INPUT } from './actions';
import { messagesReducer } from './reducer';

describe('messagesReducer', () => {
  it('Reducer существует', () => {
    expect(messagesReducer).toBeInstanceOf(Function);
  });

  it('При старте Reducer возвращает значение по умолчанию', () => {
    expect(messagesReducer(undefined, {})).toEqual({
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
    });
  });

  it('При Action = INIT_MESSAGE_LIST', () => {
    expect(messagesReducer(undefined, { type: INIT_MESSAGE_LIST, chatId: 2 })).toEqual({
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
        ],
        chat2: [
          {
            id: '1',
            author: 'BOT',
            text: 'Добро пожаловать в чат №2'
          }
        ]
      },
      tempInput: ['', '']
    });
  });

  it('При Action = INPUT_NAME', () => {
    expect(
      messagesReducer(undefined, {
        type: ADD_MESSAGE,
        chatId: 1,
        id: 'id',
        author: 'User',
        text: 'Петя, привет'
      })
    ).toEqual({
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
          },
          {
            id: 'id',
            author: 'User',
            text: 'Петя, привет'
          }
        ]
      },
      tempInput: ['', '']
    });
  });

  it('При Action = INIT_TEMP_INPUT', () => {
    expect(messagesReducer(undefined, { type: INIT_TEMP_INPUT })).toEqual({
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
      tempInput: ['', '', '']
    });
  });

  it('При Action = CHANGE_TEMP_INPUT', () => {
    expect(
      messagesReducer(undefined, {
        type: CHANGE_TEMP_INPUT,
        id: 1,
        value: 'Салют!'
      })
    ).toEqual({
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
      tempInput: ['', 'Салют!']
    });
  });
});
