import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import topic, { sagas as topicSagas } from './topic';
import style, { sagas as styleSagas } from './style';

export const rootReducer = combineReducers({
  topic,
  style,
});

export function* rootSaga() {
  yield all([
    ...topicSagas,
    ...styleSagas,
  ]);
}
