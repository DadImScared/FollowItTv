
import * as showActionTypes from '../actiontypes/shows';

function shows(state={}, action) {
  switch(action.type) {
  case showActionTypes.ADD_SHOW:
    return {
      ...state,
      [action.id]: {
        ...action.payload
      }
    };
  default:
    return state;
  }
}

export default shows;
