import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the checklist state domain
 */

const selectChecklistDomain = state => state.checklist || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Checklist
 */

const makeSelectChecklist = () =>
  createSelector(
    selectChecklistDomain,
    substate => substate,
  );

const makeSelectLoading = () =>
  createSelector(
    selectChecklistDomain,
    substate => substate.loading,
  );

const makeSelectTodoList = () =>
  createSelector(
    selectChecklistDomain,
    substate => substate.todoList,
  );

const makeSelectCompletedList = () =>
  createSelector(
    selectChecklistDomain,
    substate => substate.completedList,
  );

const makeSelectDeletedList = () =>
  createSelector(
    selectChecklistDomain,
    substate => substate.deletedList,
  );

export default makeSelectChecklist;
export { selectChecklistDomain, makeSelectLoading, makeSelectTodoList, makeSelectCompletedList, makeSelectDeletedList };
