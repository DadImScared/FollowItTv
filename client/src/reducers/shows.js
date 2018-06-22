
import * as showActionTypes from '../actiontypes/shows';
import { ADD_CHARACTERS } from '../actiontypes/characters';

function shows(state={}, action) {
  switch(action.type) {
    case showActionTypes.ADD_SHOW:
      return {
        ...state,
        [action.id]: {
          ...action.payload
        }
      };
    case showActionTypes.ADD_SHOWS:
      return {
        ...state,
        ...action.shows
      };
    case ADD_CHARACTERS:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          cast: action.characterIds
        }
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
