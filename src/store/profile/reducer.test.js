import { TOGGLE_VISIBLE, TOGGLE_AUTH, CHANGE_LOGIN, CHANGE_NAME } from './actions';
import { profileReducer } from './reducer';

describe('profileReducer', () => {
  it('Reducer существует', () => {
    expect(profileReducer).toBeInstanceOf(Function);
  });

  it('При старте Reducer возвращает значение по умолчанию', () => {
    expect(profileReducer(undefined, {})).toEqual({
      visible: false,
      auth: false,
      login: 'email',
      name: 'user'
    });
  });

  it('При Action = TOGGLE_VISIBLE', () => {
    expect(profileReducer(undefined, { type: TOGGLE_VISIBLE })).toEqual({
      visible: true,
      auth: false,
      login: 'email',
      name: 'user'
    });
  });

  it('При Action = TOGGLE_AUTH', () => {
    expect(profileReducer(undefined, { type: TOGGLE_AUTH, status: true })).toEqual({
      visible: false,
      auth: true,
      login: 'email',
      name: 'user'
    });
  });

  it('При Action = CHANGE_LOGIN', () => {
    expect(profileReducer(undefined, { type: CHANGE_LOGIN, email: 'test@test.test' })).toEqual({
      visible: false,
      auth: false,
      login: 'test@test.test',
      name: 'user'
    });
  });

  it('При Action = CHANGE_NAME', () => {
    expect(profileReducer(undefined, { type: CHANGE_NAME, name: 'Вася' })).toEqual({
      visible: false,
      auth: false,
      login: 'email',
      name: 'Вася'
    });
  });
});
