
import { ADD_CHARACTERS } from '../actiontypes/characters';

function showCharacters(state = {}, action) {
  switch (action.type) {
    case ADD_CHARACTERS:
      return {
        ...state,
        [action.id]: action.characterIds
      };
    default:
      return state;
  }
}

export default showCharacters;
