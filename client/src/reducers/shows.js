
import * as showActionTypes from '../actiontypes/shows';

function shows(state={}, action) {
  switch(action.type) {
    case showActionTypes.ADD_SHOW:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          ...action.payload
        }
      };
    case showActionTypes.ADD_SHOWS:
      return {
        ...state,
        ...action.shows
      };
    case showActionTypes.UPDATE_SHOW:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          [action.key]: action.value
        }
      };
    default:
      return state;
  }
}

export default shows;
