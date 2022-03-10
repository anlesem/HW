import { TOGGLE_PROFILE, INPUT_NAME, CHANGE_NAME } from './actions';

const initialState = {
   visible: false,
   input: '',
   name: 'user'
}

export const profileReducer = (state = initialState, Action) => {
   switch (Action.type) {
      case TOGGLE_PROFILE:
         return {
            ...state,
            visible: !state.visible,
         };
      case INPUT_NAME:
         return {
            ...state,
            input: Action.value,
         };
      case CHANGE_NAME:
         return {
            ...state,
            name: state.input,
            input: '',
            visible: !state.visible,
         };
      default:
         return state;
   }
}