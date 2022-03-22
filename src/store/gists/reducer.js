import { GET_GISTS, TOGGLE_LOAD, TOGGLE_ERROR } from './actions';

const initialState = {
  gists: [],
  onLoad: false,
  error: false
};

export const gistsReducer = (state = initialState, Action) => {
  switch (Action.type) {
    case GET_GISTS:
      return {
        ...state,
        gists: Action.payload
      };
    case TOGGLE_LOAD:
      return {
        ...state,
        onLoad: !state.onLoad
      };
    case TOGGLE_ERROR:
      return {
        ...state,
        error: !state.error
      };
    default:
      return state;
  }
};
