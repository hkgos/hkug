import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { modules } from 'hkug-client-core';

const { rootReducer, rootSaga } = modules.root;

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware),
  );
  sagaMiddleware.run(rootSaga);
  return store;
}
