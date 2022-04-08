import { CHANGE_COUNTER, RENAME_CHAT, SET_CHAT } from './actions';
import { chatsReducer } from './reducer';

describe('chatsReducer', () => {
  it('Reducer существует', () => {
    expect(chatsReducer).toBeInstanceOf(Function);
  });

  it('При старте Reducer возвращает значение по умолчанию', () => {
    expect(chatsReducer(undefined, {})).toEqual({
      counterID: 0,
      chatList: []
    });
  });

  it('При Action = CHANGE_COUNTER', () => {
    expect(chatsReducer(undefined, { type: CHANGE_COUNTER, id: 1 })).toEqual({
      counterID: 1,
      chatList: []
    });
  });

  it('При Action = SET_CHAT', () => {
    expect(
      chatsReducer(undefined, { type: SET_CHAT, payload: [{ id: 1, name: 'чат 1' }] })
    ).toEqual({
      counterID: 0,
      chatList: [
        {
          id: 1,
          name: 'чат 1'
        }
      ]
    });
  });

  it('При Action = RENAME_CHAT', () => {
    const init = {
      counterID: 1,
      chatList: [
        {
          id: 1,
          name: 'Петя'
        }
      ]
    };
    expect(chatsReducer(init, { type: RENAME_CHAT, id: 1, value: 'Петя' })).toEqual({
      counterID: 1,
      chatList: [
        {
          id: 1,
          name: 'Петя'
        }
      ]
    });
  });
});
