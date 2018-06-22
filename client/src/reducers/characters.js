
import { ADD_CHARACTERS } from '../actiontypes/characters';

function characters(state = {}, action) {
  switch(action.type) {
    case ADD_CHARACTERS:
      return {
        ...state,
        ...action.characters
      };
    default:
      return state;
  }
}

export default characters;
