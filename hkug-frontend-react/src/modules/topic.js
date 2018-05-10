import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as API from '../utils/api';
// Actions
export const FETCH_TOPICS = 'FETCH_TOPICS';
export const FETCH_TOPICS_SUCCEEDED = 'FETCH_TOPICS_SUCCEEDED';
export const FETCH_TOPICS_FAILED = 'FETCH_TOPICS_FAILED';

// Default state
export const defaultState = () => ({
  isFetchingTopics: false,
  isFetchTopicsError: false,
  fetchTopicsError: null,
  topics: [],
  page: 0,
});

// Action creator
export function fetchTopics(payload = {}, meta = {}) {
  return ({ type: FETCH_TOPICS, payload, meta });
}

// Worker
function* doFetchTopics(action) {
  try {
    let page = yield select(state => state.topic.page);
    if (action.meta.reset) {
      page = 0;
    }
    const res = yield call(API.fetchTopics, {
      category: action.payload.category,
      page: page + 1,
    });
    yield put({
      type: FETCH_TOPICS_SUCCEEDED,
      payload: {
        topics: res,
        page: page + 1,
      },
      meta: action.meta,
    });
  } catch (error) {
    yield put({ type: FETCH_TOPICS_FAILED, error });
  }
}

export const sagas = [
  takeLatest(FETCH_TOPICS, doFetchTopics),
];

// Reducer
export default function reducer(state = defaultState(), action) {
  switch (action.type) {
    case FETCH_TOPICS:
      return {
        ...state,
        isFetchingTopics: true,
        isFetchTopicsError: false,
        topics: action.meta.reset ? [] : state.topics,
      };
    case FETCH_TOPICS_SUCCEEDED:
      return {
        ...state,
        isFetchingTopics: false,
        topics: state.topics.concat(action.payload.topics),
        page: action.payload.page,
      };
    case FETCH_TOPICS_FAILED:
      return {
        ...state,
        isFetchingTopics: false,
        isFetchTopicsError: true,
        fetchTopicsError: action.error,
      };
    default:
      return state;
  }
}
