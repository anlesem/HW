import { ADD_CHAT, RENAME_CHAT, DELETE_CHAT } from './actions';
import { chatsReducer } from './reducer';

describe('chatsReducer', () => {
  it('Reducer существует', () => {
    expect(chatsReducer).toBeInstanceOf(Function);
  });

  it('При старте Reducer возвращает значение по умолчанию', () => {
    expect(chatsReducer(undefined, {})).toEqual({
      counterID: 1,
      chatList: [
        {
          id: 1,
          name: 'чат 1'
        }
      ]
    });
  });

  it('При Action = TOGGLE_PROFILE', () => {
    expect(chatsReducer(undefined, { type: ADD_CHAT })).toEqual({
      counterID: 2,
      chatList: [
        {
          id: 1,
          name: 'чат 1'
        },
        {
          id: 2,
          name: 'чат 2'
        }
      ]
    });
  });

  it('При Action = RENAME_CHAT', () => {
    expect(chatsReducer(undefined, { type: RENAME_CHAT, id: 1, value: 'Петя' })).toEqual({
      counterID: 1,
      chatList: [
        {
          id: 1,
          name: 'Петя'
        }
      ]
    });
  });

  it('При Action = DELETE_CHAT', () => {
    expect(chatsReducer(undefined, { type: DELETE_CHAT, id: 1 })).toEqual({
      counterID: 1,
      chatList: []
    });
  });
});
