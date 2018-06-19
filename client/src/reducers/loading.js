
import { LOADING_START, LOADING_END } from '../actiontypes/loading';

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

export default loading;
