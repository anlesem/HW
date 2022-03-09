import { TOGGLE_PROFILE } from './actions';

const initialState = {
   visible: false,
   name: 'Default'
}

export const profileReducer = (state = initialState, Action) => {
   switch (Action.type) {
      case TOGGLE_PROFILE:
         return {
            ...state,
            visible: !state.visible,
         };
      default:
         return state;
   }
}