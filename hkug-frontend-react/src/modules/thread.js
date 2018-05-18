import { call, put, takeLatest } from 'redux-saga/effects';
import * as API from '../utils/api';
// Actions
export const FETCH_REPLIES = 'FETCH_REPLIES';
export const FETCH_REPLIES_SUCCEEDED = 'FETCH_REPLIES_SUCCEEDED';
export const FETCH_REPLIES_FAILED = 'FETCH_REPLIES_FAILED';

// Default state
export const defaultState = () => ({
  isFetchingReplies: false,
  isFetchRepliesError: false,
  fetchRepliesError: null,
  title: '',
  replies: [],
});

// Action creator
export function fetchReplies(payload = {}) {
  return ({ type: FETCH_REPLIES, payload });
}

// Worker
function* doFetchReplies(action) {
  try {
    const res = yield call(API.fetchReplies, action.payload);
    yield put({
      type: FETCH_REPLIES_SUCCEEDED,
      payload: res,
    });
  } catch (error) {
    yield put({ type: FETCH_REPLIES_FAILED, error });
  }
}

export const sagas = [
  takeLatest(FETCH_REPLIES, doFetchReplies),
];

// Reducer
export default function reducer(state = defaultState(), action) {
  switch (action.type) {
    case FETCH_REPLIES:
      return {
        ...state,
        isFetchingReplies: true,
        isFetchRepliesError: false,
        replies: [],
      };
    case FETCH_REPLIES_SUCCEEDED:
      return {
        ...state,
        isFetchingReplies: false,
        ...action.payload,
      };
    case FETCH_REPLIES_FAILED:
      return {
        ...state,
        isFetchingReplies: false,
        isFetchRepliesError: true,
        fetchRepliesError: action.error,
      };
    default:
      return state;
  }
}
