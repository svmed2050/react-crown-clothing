import { compose, createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'

import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger'
import { rootReducer } from './root-reducer'
import createSagaMiddleware from 'redux-saga'

import { rootSaga } from './root-saga'

// Redux Persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// End of Redux Persist

// Saga middleware
const sagaMiddleware = createSagaMiddleware();

// End of saga middleware


const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


const middleWares = [
  process.env.NODE_ENV !== 'production' && logger,
  sagaMiddleware
].filter(Boolean)

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares))

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
)

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)




