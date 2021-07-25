/*
 *
 * Register reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, POST_USER, POST_USER_SUCCESS, POST_USER_ERROR} from './constants';

export const initialState = {
  loading: false,
  usersList: [],
};

/* eslint-disable default-case, no-param-reassign */
const registerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case POST_USER:
        draft.loading = true;
        break;
      case POST_USER_SUCCESS:
        draft.loading = false;
        break;  
      case POST_USER_ERROR:
        draft.loading = false;
        break;    
    }
  });

export default registerReducer;
