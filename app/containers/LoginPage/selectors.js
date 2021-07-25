import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the loginPage state domain
 */

const selectLoginPageDomain = state => state.loginPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by LoginPage
 */

const makeSelectLoginPage = () =>
  createSelector(
    selectLoginPageDomain,
    substate => substate,
  );

const makeSelectLoading = () =>
  createSelector(
    selectLoginPageDomain,
    substate => substate.loading,
  )

const makeSelectAPIResponse = () => 
  createSelector(
    selectLoginPageDomain,
    substate => substate.apiResponse,
  )

const makeSelectAPIResponseStatus = () => 
  createSelector(
    selectLoginPageDomain,
    substate => substate.apiResponse.status,
  )

const makeSelectAPIResponseMessage = () => 
  createSelector(
    selectLoginPageDomain,
    substate => substate.apiResponse.message,
  )

export { 
  makeSelectLoginPage, 
  makeSelectLoading,
  makeSelectAPIResponse,
  makeSelectAPIResponseMessage,
  makeSelectAPIResponseStatus,
};
