import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import createSagaMiddleware from 'redux-saga';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {persistStore, persistReducer} from 'redux-persist';

import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';

import rootReducer from '../reducers';
import rootSaga from '../sagas';

const bindMiddleware = middleware => applyMiddleware(...middleware);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [],
  version: 1.0,
  stateReconciler: autoMergeLevel1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

function configureStore() {
  const middlewares = [];
  const sagaMiddleware = createSagaMiddleware();
  middlewares.push(sagaMiddleware);
  let store;
  if (__DEV__) {
    store = createStore(
      persistedReducer,
      composeWithDevTools(applyMiddleware(...middlewares)),
    );
  } else {
    store = createStore(persistedReducer, bindMiddleware(middlewares));
  }

  const persistor = persistStore(store);
  store.sagaTask = sagaMiddleware.run(rootSaga);

  return {store, persistor};
}

export default configureStore;
