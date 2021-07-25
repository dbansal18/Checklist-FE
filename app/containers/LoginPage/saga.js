import { push } from 'connected-react-router';
import { call, all, takeLatest, put } from 'redux-saga/effects';
import { userDataLoaded } from 'containers/App/actions';
import { userDataFailure, userDataSuccess, loginError } from './actions'
import { LOGIN_ACTION } from './constants';
import request from 'utils/request';
import { API } from 'utils/constants';
import {  } from './../App/actions';

function* getLoginData(action) {
  const requestURL = `${API}auth/signin`;
  const headers = {
    method: 'POST',
    headers:{
      'cache-control': 'no-cache',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username: action.username, password: action.password})
  };

  try {
    const userDetails = yield call(request, requestURL, headers);
    // console.log('user', userDetails);
    yield put(userDataSuccess());
    yield put(userDataLoaded(userDetails));
    yield put(push('/home'));
  } catch (error) {
    // eslint-disable-next-line no-console
    // yield put(userDataFailure());
    if(error.response.status == 401) yield(put(loginError('Wrong Password')));
    else if(error.response.status == 404) yield(put(loginError('User not found')));
    else if(error.response.status == 403) yield(put(loginError('Account not activated. Contact admin to activate it.')))
    else yield(put(loginError('Unknown Error')));
    // console.log('error',error.response);
  }
}

// Individual exports for testing
export default function* loginPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(LOGIN_ACTION, getLoginData);
}
