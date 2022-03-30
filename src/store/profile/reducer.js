import { TOGGLE_VISIBLE, TOGGLE_AUTH, CHANGE_LOGIN, CHANGE_NAME } from './actions';

const initialState = {
  visible: false,
  auth: false,
  login: 'email',
  name: 'user'
};

export const profileReducer = (state = initialState, Action) => {
  switch (Action.type) {
    case TOGGLE_VISIBLE:
      return {
        ...state,
        visible: !state.visible
      };
    case TOGGLE_AUTH:
      return {
        ...state,
        auth: Action.status
      };
    case CHANGE_LOGIN:
      return {
        ...state,
        login: Action.email
      };
    case CHANGE_NAME:
      return {
        ...state,
        name: Action.name
      };
    default:
      return state;
  }
};
