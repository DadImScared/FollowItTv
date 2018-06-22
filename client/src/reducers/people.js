
import { ADD_PEOPLE } from '../actiontypes/people';
import { ADD_CHARACTERS } from '../actiontypes/characters';
import { ADD_CREW } from '../actiontypes/crew';

function people(state = {}, action) {
  switch(action.type) {
    case ADD_PEOPLE:
    case ADD_CHARACTERS:
    case ADD_CREW:
      return {
        ...state,
        ...action.people
      };
    default:
      return state;
  }
}

export default people;
