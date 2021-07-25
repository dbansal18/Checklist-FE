/*
 *
 * LoginPage actions
 *
 */

import { DEFAULT_ACTION, LOGIN_ACTION, USER_DATA_FAILURE, USER_DATA_SUCCESS, LOGIN_ERROR, API_RESPONSE
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getUserLogin(username, password) {
  return {
    type: LOGIN_ACTION,
    username, password,
  }
}

export function userDataSuccess() {
  return {
    type: USER_DATA_SUCCESS,
  }
}

export function userDataFailure() {
  return {
    type: USER_DATA_FAILURE,
  }
}

export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error,
  };
}

export function setApiResponseNull() {
  return {
    type: API_RESPONSE,
  };
}
