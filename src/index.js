import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux'
import setupSocket from './sockets'
import handleNewMessage from './saga'
import reducers from './reducers'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import username from './libs/user'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
)

const socket = setupSocket(store.dispatch, username)

sagaMiddleware.run(handleNewMessage, { socket, username })

ReactDOM.render( <Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
