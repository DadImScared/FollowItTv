
import { ADD_SEARCH } from '../actiontypes/search';


function search(state={}, action) {
  switch(action.type) {
  case ADD_SEARCH:
    return {
      ...state,
      [action.query]: action.results
    };
  default:
    return state;
  }
}

export default search;
