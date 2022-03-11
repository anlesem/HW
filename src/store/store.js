import { createStore, combineReducers, compose } from 'redux';
import { profileReducer } from './profile/reducer';
import { chatsReducer } from './chats/reducer';
import { messagesReducer } from './messages/reducer';

export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  combineReducers({
    profile: profileReducer,
    chats: chatsReducer,
    messages: messagesReducer
  }),
  composeEnhancers()
);
