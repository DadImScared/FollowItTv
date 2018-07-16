
import { createSelector } from 'reselect';

import { LOADING_START, LOADING_END } from '../actiontypes/loading';
import _ from 'lodash';

function loading(state = {}, action) {
  switch(action.type) {
    case LOADING_START:
      return {
        ...state,
        [action.requestId]: true
      };
    case LOADING_END:
      return {
        ...state,
        [action.requestId]: false
      };
    default:
      return state;
  }
}

export const loadingState = (state) => state.loading;

export const getLoading = (loadingPrefix, propsPath, defaultValue) => {
  return createSelector(
    [loadingState, (_state, props) => _.get(props, propsPath, defaultValue)],
    (loading, loadingId) => loading[`${loadingPrefix}${loadingId}`]
  );
};

export default loading;
