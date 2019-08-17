import React from 'react';
import ReactDOM from 'react-dom';
import {createBrowserHistory} from 'history';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import {connectRouter, routerMiddleware, ConnectedRouter} from 'connected-react-router';
import * as serviceWorker from './serviceWorker';
import axios from './axios-api';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';

import App from './App';

import {loadFromLocalStorage, saveToLocalStorage} from "./store/localStorage";
import userReducer from "./store/reducers/userReducer";
import placeReducer from "./store/reducers/placeReducer";
import reviewReducer from "./store/reducers/reviewReducer";
import photoReducer from "./store/reducers/photoReducer";

const history = createBrowserHistory();

const rootReducer = combineReducers({
  router: connectRouter(history),
  users: userReducer,
  places: placeReducer,
  reviews: reviewReducer,
  photos: photoReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [
  thunkMiddleware,
  routerMiddleware(history)
];

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const persistedState = loadFromLocalStorage();

const store = createStore(rootReducer, persistedState, enhancers);

store.subscribe(() => {
  saveToLocalStorage({
    users: {
      user: store.getState().users.user
    }
  })
});

axios.interceptors.request.use(config => {
  try {
    config.headers['Authorization'] = store.getState().users.user.token;
  } catch(e) {
    // do nothing, user is not logged in
  }

  return config
});

const app = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App/>
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();

