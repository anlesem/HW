import { TOGGLE_LOGIN, CHANGE_NAME } from './actions';

const initialState = {
  login: false,
  name: 'user'
};

export const profileReducer = (state = initialState, Action) => {
  switch (Action.type) {
    case TOGGLE_LOGIN:
      return {
        ...state,
        login: Action.status
      };
    case CHANGE_NAME:
      return {
        ...state,
        name: Action.auth
      };
    default:
      return state;
  }
};
