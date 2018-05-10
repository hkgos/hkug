import { call, put, takeLatest } from 'redux-saga/effects';
import theme from '../styles/theme/default';
// Actions
export const CHANGE_THEME = 'CHANGE_THEME';
export const CHANGE_THEME_SUCCEEDED = 'CHANGE_THEME_SUCCEEDED';
export const CHANGE_THEME_FAILED = 'CHANGE_THEME_FAILED';

// Default state
export const defaultState = () => ({
  isFetching: false,
  isError: false,
  error: null,
  theme,
});

// Action creator
export function changeTheme(payload) {
  return ({
    type: CHANGE_THEME,
    payload,
  });
}

// Worker
function* doChangeTheme(action) {
  try {
    const newTheme = yield call(name => import(`../styles/theme/${name}`), action.payload);
    yield put({ type: CHANGE_THEME_SUCCEEDED, payload: newTheme.default });
  } catch (error) {
    yield put({ type: CHANGE_THEME_FAILED, error });
  }
}

export const sagas = [
  takeLatest(CHANGE_THEME, doChangeTheme),
];

// Reducer
export default function reducer(state = defaultState(), action) {
  switch (action.type) {
    case CHANGE_THEME:
      return {
        ...state,
        isFetching: true,
        isError: false,
      };
    case CHANGE_THEME_SUCCEEDED:
      return {
        ...state,
        isFetching: false,
        theme: action.payload,
      };
    case CHANGE_THEME_FAILED:
      return {
        ...state,
        isFetching: false,
        isError: true,
        error: action.error,
      };
    default:
      return state;
  }
}
