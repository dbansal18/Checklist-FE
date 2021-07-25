import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the register state domain
 */

const selectRegisterDomain = state => state.register || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Register
 */

const makeSelectRegister = () =>
  createSelector(
    selectRegisterDomain,
    substate => substate,
  );
  
const makeSelectLoading = () =>
    createSelector(
      selectRegisterDomain,
      substate => substate.loading,
    )

export default makeSelectRegister;
export { selectRegisterDomain, makeSelectLoading };
