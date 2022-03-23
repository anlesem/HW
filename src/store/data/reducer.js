import { GET_ALL_DATA, TOGGLE_LOAD, SET_ERROR } from './actions';

const initialState = {
  data: [],
  onLoad: false,
  error: false
};

export const dataReducer = (state = initialState, Action) => {
  switch (Action.type) {
    case GET_ALL_DATA:
      return {
        ...state,
        data: Action.payload
      };
    // case GET_DATA:
    //   return {
    //     ...state,
    //     data: [...state.data, Action.payload]
    //   };
    case TOGGLE_LOAD:
      return {
        ...state,
        onLoad: !state.onLoad
      };
    case SET_ERROR:
      return {
        ...state,
        error: Action.status
      };
    default:
      return state;
  }
};
