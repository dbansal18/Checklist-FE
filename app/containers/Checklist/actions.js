/*
 *
 * Checklist actions
 *
 */

import { DEFAULT_ACTION, GET_CHECKLIST, GET_CHECKLIST_SUCCESS, GET_CHECKLIST_ERROR,
  PUT_CHECKLIST, PUT_CHECKLIST_SUCCESS, PUT_CHECKLIST_ERROR
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getChecklist() {
  return {
    type: GET_CHECKLIST,
  };
}

export function getChecklistSuccess(userChecklistlist) {
  return {
    type: GET_CHECKLIST_SUCCESS,
    userChecklistlist
  };
}

export function getChecklistError(error) {
  return {
    type: GET_CHECKLIST_ERROR,
    error
  };
}
export function putChecklist(body) {
  return {
    type: PUT_CHECKLIST,
    body
  };
}

export function putChecklistSuccess() {
  return {
    type: PUT_CHECKLIST_SUCCESS,
  };
}

export function putChecklistError(error) {
  return {
    type: PUT_CHECKLIST_ERROR,
    error
  };
}