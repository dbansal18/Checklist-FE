import { takeLatest, call, put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { GET_CHECKLIST, PUT_CHECKLIST } from './constants';
import {
  getChecklistSuccess, getChecklistError,
  putChecklistSuccess, putChecklistError
} from './actions';
import request from '../../utils/request';
import { API } from '../../utils/constants';
import { makeSelectUser } from './../App/selectors';
import { apiResponseSuccess, apiResponseError } from './../App/actions';

function* getChecklist(action) {
  const user = yield select(makeSelectUser());
  const requestURL = `${API}checklist`;
  const headers = {
    method: 'GET',
    headers:{
      'cache-control': 'no-cache',
      'Content-Type': 'application/json',
      'x-access-token': user.accessToken
    }
  };

  try {
    const checklist = yield call(request, requestURL, headers);
    yield put(getChecklistSuccess(checklist));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error', error);
  }
}

function* putChecklist(action) {
  const user = yield select(makeSelectUser());
  const requestURL = `${API}checklist`;
  const headers = {
    method: 'PUT',
    headers:{
      'cache-control': 'no-cache',
      'Content-Type': 'application/json',
      'x-access-token': user.accessToken
    },
    body: JSON.stringify(action.body),
  };

  try {
    const checklist = yield call(request, requestURL, headers);
    yield put(putChecklistSuccess(checklist));
    yield put(apiResponseSuccess());
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error', error);
    yield put(putChecklistError(error));
    yield put(apiResponseError());
  }
}

// Individual exports for testing
export default function* checklistSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_CHECKLIST, getChecklist);
  yield takeLatest(PUT_CHECKLIST, putChecklist);
}
