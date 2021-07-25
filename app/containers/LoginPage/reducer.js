/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, LOGIN_ACTION, USER_DATA_FAILURE, USER_DATA_SUCCESS, API_RESPONSE,
  LOGIN_ERROR, API_RESPONSE_DEFAULT_NOTIFICATION, API_RESPONSE_ERROR_NOTIFICATION
} from './constants';

export const initialState = {
  loading: false,
  apiResponse: { ...API_RESPONSE_DEFAULT_NOTIFICATION },
};

/* eslint-disable default-case, no-param-reassign */
const loginPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOGIN_ACTION:
        draft.loading = true;
        break;
      case USER_DATA_FAILURE:
        draft.loading = false;
        break;
      case USER_DATA_SUCCESS:
        draft.loading = false;
        draft.apiResponse = { ...API_RESPONSE_DEFAULT_NOTIFICATION };
        break;
      case LOGIN_ERROR:
        draft.loading = false;
        draft.apiResponse = { ...API_RESPONSE_ERROR_NOTIFICATION, message: action.error };
        break;
      case API_RESPONSE:
        draft.apiResponse = { ...API_RESPONSE_DEFAULT_NOTIFICATION }
    }
  });

export default loginPageReducer;
