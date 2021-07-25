/*
 *
 * Register actions
 *
 */

import { DEFAULT_ACTION,
  POST_USER,
  POST_USER_SUCCESS,
  POST_USER_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function postUserAction(user) {
  return {
    type: POST_USER,
    user,
  };
}

export function postUserSuccessAction(user) {
  return {
    type: POST_USER_SUCCESS,
    user,
  };
}

export function postUserErrorAction(error) {
  return {
    type: POST_USER_ERROR,
    error,
  };
}