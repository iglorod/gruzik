import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import authReducer from './store/authorization/reducer';
import bandReducer from './store/band/reducer';
import songsReducer from './store/songs/reducer';
import commentsReducer from './store/comments/reducer';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const store = createStore(combineReducers({
  auth: authReducer,
  band: bandReducer,
  songs: songsReducer,
  cmnt: commentsReducer,
}), applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
