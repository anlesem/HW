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
import { messagesReducer } from './reducer';

describe('messagesReducer', () => {
  it('Reducer существует', () => {
    expect(messagesReducer).toBeInstanceOf(Function);
  });

  it('При старте Reducer возвращает значение по умолчанию', () => {
    expect(messagesReducer(undefined, {})).toEqual({
      messageList: {},
      counterMSG: [''],
      tempInput: ['']
    });
  });

  it('При Action = SET_MESSAGE_LIST', () => {
    expect(
      messagesReducer(undefined, {
        type: SET_MESSAGE_LIST,
        chatId: 2,
        payload: [
          {
            id: 'id',
            author: 'BOT',
            text: 'Сообщение'
          }
        ]
      })
    ).toEqual({
      messageList: {
        2: [
          {
            id: 'id',
            author: 'BOT',
            text: 'Сообщение'
          }
        ]
      },
      counterMSG: [''],
      tempInput: ['']
    });
  });

  it('При Action = INIT_MESSAGE', () => {
    expect(
      messagesReducer(undefined, {
        type: INIT_MESSAGE,
        chatId: 1,
        payload: {
          id: 'id',
          author: 'User',
          text: 'Петя, привет'
        }
      })
    ).toEqual({
      messageList: {
        1: [
          {
            id: 'id',
            author: 'User',
            text: 'Петя, привет'
          }
        ]
      },
      counterMSG: [''],
      tempInput: ['']
    });
  });

  it('При Action = ADD_MESSAGE', () => {
    const init = {
      messageList: {
        1: [
          {
            id: 'id',
            author: 'User',
            text: 'Петя, привет'
          }
        ]
      },
      counterMSG: [''],
      tempInput: ['']
    };

    expect(
      messagesReducer(init, {
        type: ADD_MESSAGE,
        chatId: 1,
        payload: {
          id: 'id2',
          author: 'User',
          text: 'И тебе привет'
        }
      })
    ).toEqual({
      messageList: {
        1: [
          {
            id: 'id',
            author: 'User',
            text: 'Петя, привет'
          },
          {
            id: 'id2',
            author: 'User',
            text: 'И тебе привет'
          }
        ]
      },
      counterMSG: [''],
      tempInput: ['']
    });
  });

  it('При Action = CHANGE_MESSAGE', () => {
    const init = {
      messageList: {
        1: [
          {
            id: 'id',
            author: 'User',
            text: 'Петя, привет'
          },
          {
            id: 'id2',
            author: 'User',
            text: 'И тебе привет'
          }
        ]
      },
      counterMSG: [''],
      tempInput: ['']
    };

    expect(
      messagesReducer(init, {
        type: CHANGE_MESSAGE,
        chatId: 1,
        id: 'id',
        value: 'Петя, привет! Как дела?'
      })
    ).toEqual({
      messageList: {
        1: [
          {
            id: 'id',
            author: 'User',
            text: 'Петя, привет! Как дела?'
          },
          {
            id: 'id2',
            author: 'User',
            text: 'И тебе привет'
          }
        ]
      },
      counterMSG: [''],
      tempInput: ['']
    });
  });

  it('При Action = DELETE_MESSAGE', () => {
    const init = {
      messageList: {
        1: [
          {
            id: 'id',
            author: 'User',
            text: 'Петя, привет'
          },
          {
            id: 'id2',
            author: 'User',
            text: 'И тебе привет'
          }
        ]
      },
      counterMSG: [''],
      tempInput: ['']
    };

    expect(
      messagesReducer(init, {
        type: DELETE_MESSAGE,
        chatId: 1,
        payload: [
          {
            id: '',
            author: 'BOT',
            text: 'Чат удалён'
          }
        ]
      })
    ).toEqual({
      messageList: {
        1: [
          {
            id: '',
            author: 'BOT',
            text: 'Чат удалён'
          }
        ]
      },
      counterMSG: [''],
      tempInput: ['']
    });
  });

  it('При Action = RESET_MESSAGE_LIST', () => {
    const init = {
      messageList: {
        1: [
          {
            id: 'id',
            author: 'User',
            text: 'Петя, привет'
          },
          {
            id: 'id2',
            author: 'User',
            text: 'И тебе привет'
          }
        ]
      },
      counterMSG: [''],
      tempInput: ['']
    };

    expect(
      messagesReducer(init, {
        type: RESET_MESSAGE_LIST
      })
    ).toEqual({
      messageList: {},
      counterMSG: [''],
      tempInput: ['']
    });
  });

  it('При Action = INIT_COUNTER_MSG', () => {
    expect(messagesReducer(undefined, { type: INIT_COUNTER_MSG, counterMSG: 1 })).toEqual({
      messageList: {},
      counterMSG: ['', 1],
      tempInput: ['']
    });
  });

  it('При Action = CHANGE_COUNTER_MSG', () => {
    const init = {
      messageList: {},
      counterMSG: ['', 1],
      tempInput: ['']
    };

    expect(
      messagesReducer(init, {
        type: CHANGE_COUNTER_MSG,
        id: 1,
        counter: 2
      })
    ).toEqual({
      messageList: {},
      counterMSG: ['', 2],
      tempInput: ['']
    });
  });

  it('При Action = RESET_COUNTER_MSG', () => {
    const init = {
      messageList: {},
      counterMSG: ['', 2, 5],
      tempInput: ['']
    };

    expect(messagesReducer(init, { type: RESET_COUNTER_MSG })).toEqual({
      messageList: {},
      counterMSG: [''],
      tempInput: ['']
    });
  });

  it('При Action = INIT_TEMP_INPUT', () => {
    expect(messagesReducer(undefined, { type: INIT_TEMP_INPUT })).toEqual({
      messageList: {},
      counterMSG: [''],
      tempInput: ['', '']
    });
  });

  it('При Action = CHANGE_TEMP_INPUT', () => {
    const init = {
      messageList: {},
      counterMSG: [''],
      tempInput: ['', '']
    };

    expect(
      messagesReducer(init, {
        type: CHANGE_TEMP_INPUT,
        id: 1,
        value: 'Салют!'
      })
    ).toEqual({
      messageList: {},
      counterMSG: [''],
      tempInput: ['', 'Салют!']
    });
  });

  it('При Action = RESET_TEMP_INPUT', () => {
    const init = {
      messageList: {},
      counterMSG: [''],
      tempInput: ['', '', '']
    };

    expect(messagesReducer(init, { type: RESET_TEMP_INPUT })).toEqual({
      messageList: {},
      counterMSG: [''],
      tempInput: ['']
    });
  });
});
