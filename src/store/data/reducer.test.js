import { GET_ALL_DATA, TOGGLE_LOAD, SET_ERROR } from './actions';
import { dataReducer } from './reducer';

describe('dataReducer', () => {
  it('Reducer существует', () => {
    expect(dataReducer).toBeInstanceOf(Function);
  });

  it('При старте Reducer возвращает значение по умолчанию', () => {
    expect(dataReducer(undefined, {})).toEqual({
      data: [],
      onLoad: false,
      error: false
    });
  });

  it('При Action = GET_ALL_DATA', () => {
    expect(dataReducer(undefined, { type: GET_ALL_DATA, payload: [{ id: 1 }, { id: 2 }] })).toEqual(
      {
        data: [{ id: 1 }, { id: 2 }],
        onLoad: false,
        error: false
      }
    );
  });

  it('При Action = TOGGLE_LOAD', () => {
    expect(dataReducer(undefined, { type: TOGGLE_LOAD })).toEqual({
      data: [],
      onLoad: true,
      error: false
    });
  });

  it('При Action = SET_ERROR', () => {
    expect(dataReducer(undefined, { type: SET_ERROR, status: true })).toEqual({
      data: [],
      onLoad: false,
      error: true
    });
  });
});
