// $FlowFixMe

import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk';
import { all } from 'redux-saga/effects'
import logger from 'redux-logger'

import userStore, { watchUser } from '../user/user-store'
import { socketInit, socketEmit } from '../common'

const sagaMiddleware = createSagaMiddleware()

const appReducer = combineReducers({
  userStore,
})

let middlewares = []

middlewares.push(thunk.withExtraArgument({ socketEmit }));

if (process.env.NODE_ENV !== 'test') {
  // skip logger middleware if we are running tests
  middlewares.push(logger)
}

middlewares.push(sagaMiddleware)

const store = createStore(appReducer, applyMiddleware(...middlewares))

sagaMiddleware.run(function* () {
  return yield all([watchUser()])
})

export * from '../user/user-store'

socketInit(store);

export default store
