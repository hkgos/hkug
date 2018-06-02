import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { modules } from 'hkug-client-core';

const { rootReducer, rootSaga } = modules.root;

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  let store;
  if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
    /* eslint-disable no-underscore-dangle */
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    /* eslint-enable */
    store = createStore(
      rootReducer,
      initialState,
      composeEnhancers(applyMiddleware(sagaMiddleware)),
    );
  } else {
    store = createStore(
      rootReducer,
      initialState,
      applyMiddleware(sagaMiddleware),
    );
  }
  sagaMiddleware.run(rootSaga);
  return store;
}
