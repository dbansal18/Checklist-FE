import { takeLatest, call, put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { GET_USERS,
  POST_USER,
} from './constants';
import {
  postUserSuccessAction,
  postUserErrorAction,
} from './actions';
import request from '../../utils/request';
import { API } from '../../utils/constants';

function* postUser(action) {
  const requestURL = `${API}auth/signup`;
  const headers = {
    method: 'POST',
    headers:{
      'cache-control': 'no-cache',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(action.user),
  };

  try {
    const user = yield call(request, requestURL, headers);
    alert("User registered successfully");
    yield put(push('/'));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error', error);
    alert("Username or email already exist");
    yield put(postUserErrorAction());
  }
}

// Individual exports for testing
export default function* registerSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(POST_USER, postUser);
}
