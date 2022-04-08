import { GET_ALL_DATA, TOGGLE_LOAD, SET_ERROR } from './actions';

const initialState = {
  data: [],
  onLoad: false,
  error: false
};

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_DATA:
      return {
        ...state,
        data: action.payload
      };
    // case GET_DATA:
    //   return {
    //     ...state,
    //     data: [...state.data, action.payload]
    //   };
    case TOGGLE_LOAD:
      return {
        ...state,
        onLoad: !state.onLoad
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.status
      };
    default:
      return state;
  }
};
