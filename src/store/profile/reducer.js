import { TOGGLE_VISIBLE, TOGGLE_AUTH, CHANGE_LOGIN, CHANGE_NAME } from './actions';

const initialState = {
  visible: false,
  auth: false,
  login: 'email',
  name: 'user'
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_VISIBLE:
      return {
        ...state,
        visible: !state.visible
      };
    case TOGGLE_AUTH:
      return {
        ...state,
        auth: action.status
      };
    case CHANGE_LOGIN:
      return {
        ...state,
        login: action.email
      };
    case CHANGE_NAME:
      return {
        ...state,
        name: action.name
      };
    default:
      return state;
  }
};
