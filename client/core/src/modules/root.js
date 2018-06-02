import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import topic, { sagas as topicSagas } from './topic';
import thread, { sagas as threadSagas } from './thread';

export const rootReducer = combineReducers({
  topic,
  thread,
});

export function* rootSaga() {
  yield all([
    ...topicSagas,
    ...threadSagas,
  ]);
}
