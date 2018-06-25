import {
  call,
  put,
  takeLatest,
  takeEvery,
} from 'redux-saga/effects';
import * as API from '../utils/api';
import Reply from '../models/Reply';
// Actions
export const FETCH_REPLIES = 'FETCH_REPLIES';
export const FETCH_REPLIES_SUCCEEDED = 'FETCH_REPLIES_SUCCEEDED';
export const FETCH_REPLIES_FAILED = 'FETCH_REPLIES_FAILED';
export const FETCH_QUOTE = 'FETCH_QUOTE';
export const FETCH_QUOTE_SUCCEEDED = 'FETCH_QUOTE_SUCCEEDED';
export const FETCH_QUOTE_FAILED = 'FETCH_QUOTE_FAILED';

// Default state
export const defaultState = () => ({
  status: 'DONE',
  error: null,
  totalPage: 0,
  title: '',
  replies: [],
  like: 0,
  dislike: 0,
  quoteFetchingList: [],
});

// Action creator
export function fetchReplies(payload = {}, meta = {}) {
  return ({ type: FETCH_REPLIES, payload, meta });
}
export function fetchQuote(payload = {}, meta = {}) {
  return ({ type: FETCH_QUOTE, payload, meta });
}

// Worker
function* doFetchReplies(action) {
  try {
    const res = yield call(API.fetchReplies, action.payload);
    yield put({
      type: FETCH_REPLIES_SUCCEEDED,
      payload: res,
      meta: action.meta,
    });
  } catch (error) {
    yield put({ type: FETCH_REPLIES_FAILED, error, meta: action.meta });
  }
}
function* doFetchQuote(action) {
  try {
    const res = yield call(API.fetchQuote, action.payload);
    yield put({
      type: FETCH_QUOTE_SUCCEEDED,
      payload: res,
      meta: action.meta,
    });
  } catch (error) {
    yield put({ type: FETCH_QUOTE_FAILED, error, meta: action.meta });
  }
}

export const sagas = [
  takeLatest(FETCH_REPLIES, doFetchReplies),
  takeEvery(FETCH_QUOTE, doFetchQuote),
];

// Reducer
export default function reducer(state = defaultState(), action) {
  switch (action.type) {
    case FETCH_REPLIES:
      return {
        ...state,
        status: FETCH_REPLIES,
        error: null,
        replies: [],
      };
    case FETCH_REPLIES_SUCCEEDED:
      return {
        ...state,
        status: 'DONE',
        ...action.payload,
      };
    case FETCH_REPLIES_FAILED:
      return {
        ...state,
        status: 'ERROR',
        error: action.error,
      };
    case FETCH_QUOTE:
      return {
        ...state,
        status: FETCH_QUOTE,
        quoteFetchingList: [action.payload.quote].concat(state.quoteFetchingList),
        error: null,
      };
    case FETCH_QUOTE_SUCCEEDED:
      return {
        ...state,
        status: 'DONE',
        quoteFetchingList: state.quoteFetchingList.filter(a => a !== action.meta.quote),
        replies: state.replies.map((r) => {
          if (r.replyId === action.meta.replyId) {
            return new Reply({
              ...r,
              content: r.content.replace(`<button data-quote-post-id="${action.meta.quote}" />`, action.payload),
            });
          }
          return r;
        }),
      };
    case FETCH_QUOTE_FAILED:
      return {
        ...state,
        status: 'ERROR',
        quoteFetchingList: state.quoteFetchingList.filter(a => a !== action.meta.quote),
        error: action.error,
      };
    default:
      return state;
  }
}
