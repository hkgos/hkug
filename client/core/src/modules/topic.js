import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';
import * as API from '../utils/api';
// Actions
export const FETCH_TOPICS = 'FETCH_TOPICS';
export const FETCH_TOPICS_SUCCEEDED = 'FETCH_TOPICS_SUCCEEDED';
export const FETCH_TOPICS_FAILED = 'FETCH_TOPICS_FAILED';

// Default state
export const defaultState = () => ({
  status: 'DONE',
  error: null,
  topics: [],
  page: 0,
});

// Action creator
export function fetchTopics(payload = {}, meta = {}) {
  return ({ type: FETCH_TOPICS, payload, meta });
}

// Worker
function* doFetchTopics(action) {
  let page = yield select(state => state.topic.page);
  if (action.meta.reset) {
    page = 0;
  }
  const res = yield call(API.fetchTopics, {
    category: action.payload.category,
    type: action.payload.type,
    page: page + 1,
  });
  if (res.hkgError && res.lihkgError) {
    yield put({
      type: FETCH_TOPICS_FAILED,
      payload: {
        topics: [],
        page,
      },
      meta: action.mata,
      error: new Error('網絡發生問題'),
    });
  } else if (res.hkgError || res.lihkgError) {
    yield put({
      type: FETCH_TOPICS_FAILED,
      payload: {
        topics: res.topics,
        page: page + 1,
      },
      meta: action.mata,
      error: res.hkgError || res.lihkgError,
    });
  } else {
    yield put({
      type: FETCH_TOPICS_SUCCEEDED,
      payload: {
        topics: res.topics,
        page: page + 1,
      },
      meta: action.meta,
    });
  }
}

export const sagas = [
  takeLatest(FETCH_TOPICS, doFetchTopics),
];

function mergeTopics(current, next) {
  // prevent duplicate Topics
  // currently just check the last page (30 elements)
  // to avoid any performance issues
  const sliced = current.length > 60 ? current.slice(-60) : current;
  // remove Topics already included in the current list
  const filtered = next
    .filter(n => !(sliced.some(c => c.topicId === n.topicId)));
  return current.concat(filtered);
}
// Reducer
export default function reducer(state = defaultState(), action) {
  switch (action.type) {
    case FETCH_TOPICS:
      return {
        ...state,
        status: FETCH_TOPICS,
        error: null,
        topics: action.meta.reset ? [] : state.topics,
      };
    case FETCH_TOPICS_SUCCEEDED:
      return {
        ...state,
        status: 'DONE',
        topics: mergeTopics(state.topics, action.payload.topics),
        page: action.payload.page,
      };
    case FETCH_TOPICS_FAILED:
      return {
        ...state,
        status: 'ERROR',
        topics: mergeTopics(state.topics, action.payload.topics),
        page: action.payload.page,
        error: action.error,
      };
    default:
      return state;
  }
}
