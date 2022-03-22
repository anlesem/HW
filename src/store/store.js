import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { profileReducer } from './profile/reducer';
import { chatsReducer } from './chats/reducer';
import { messagesReducer } from './messages/reducer';
import { gistsReducer } from './gists/reducer';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['gists']
};

const rootReducers = combineReducers({
  profile: profileReducer,
  chats: chatsReducer,
  messages: messagesReducer,
  gists: gistsReducer
});

const persistedReducers = persistReducer(persistConfig, rootReducers);

export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(persistedReducers, composeEnhancers(applyMiddleware(thunk)));

export const persistor = persistStore(store);
