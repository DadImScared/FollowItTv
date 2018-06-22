
import { ADD_PEOPLE } from '../actiontypes/people';
import { ADD_CHARACTERS } from '../actiontypes/characters';

function people(state = {}, action) {
  switch(action.type) {
    case ADD_PEOPLE:
      return {
        ...state,
        ...action.people
      };
    // since people can be added separate from characters
    case ADD_CHARACTERS:
      return {
        ...state,
        ...action.people
      };
    default:
      return state;
  }
}

export default people;
