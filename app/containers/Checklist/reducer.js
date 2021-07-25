/*
 *
 * Checklist reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, GET_CHECKLIST, GET_CHECKLIST_ERROR, GET_CHECKLIST_SUCCESS,
  PUT_CHECKLIST, PUT_CHECKLIST_ERROR, PUT_CHECKLIST_SUCCESS
} from './constants';

export const initialState = {
  todoList: [],
  completedList: [],
  deletedList: [],
  loading: false
};

/* eslint-disable default-case, no-param-reassign */
const checklistReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case GET_CHECKLIST:
        draft.loading = true;
        break;
      case GET_CHECKLIST_SUCCESS:
        draft.todoList = action.userChecklistlist.list;
        draft.completedList = action.userChecklistlist.completedList;
        draft.deletedList = action.userChecklistlist.deletedList;
        draft.loading = false;
        break;
      case GET_CHECKLIST_ERROR:
        draft.loading = false;
        break;
      case PUT_CHECKLIST:
        draft.loading = true;
        break;
      case PUT_CHECKLIST_SUCCESS:
        draft.loading = false;
        break;
      case PUT_CHECKLIST_ERROR:
        draft.loading = false;
        
    }
  });

export default checklistReducer;
