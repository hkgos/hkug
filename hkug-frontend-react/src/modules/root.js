import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import topic, { sagas as topicSagas } from './topic';
import thread, { sagas as threadSagas } from './thread';
import style, { sagas as styleSagas } from './style';

export const rootReducer = combineReducers({
  topic,
  thread,
  style,
});

export function* rootSaga() {
  yield all([
    ...topicSagas,
    ...threadSagas,
    ...styleSagas,
  ]);
}
