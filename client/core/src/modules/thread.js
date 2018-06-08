import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
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
  isFetchingReplies: false,
  isFetchRepliesError: false,
  fetchRepliesError: null,
  totalPage: 1,
  title: '',
  replies: [],
  fetchingQuoteId: [],
  isFetchQuoteError: false,
});

// Action creator
export function fetchReplies(payload = {}) {
  return ({ type: FETCH_REPLIES, payload });
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
    });
  } catch (error) {
    yield put({ type: FETCH_REPLIES_FAILED, error });
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
    case FETCH_QUOTE:
      return {
        ...state,
        fetchingQuoteId: [action.payload.quote].concat(state.fetchingQuoteId),
        isFetchQuoteError: false,
      };
    case FETCH_QUOTE_SUCCEEDED:
      return {
        ...state,
        fetchingQuoteId: state.fetchingQuoteId.filter(a => a !== action.meta.quote),
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
        fetchingQuoteId: state.fetchingQuoteId.filter(a => a !== action.meta.quote),
        isFetchQuoteError: true,
        fetchQuoteError: action.error,
      };
    default:
      return state;
  }
}
