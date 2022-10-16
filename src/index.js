import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import store from './redux/store';
import logger from 'redux-logger';
import App from './components/App/App';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

const storeInstance = createStore(
  combineReducers({
      
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react-root'),
);
