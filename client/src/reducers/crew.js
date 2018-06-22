
import { ADD_CREW } from '../actiontypes/crew';

function crew(state = {}, action) {
  switch (action.type) {
    case ADD_CREW:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          ...action.crewMembers
        }
      };
    default:
      return state;
  }
}

export default crew;
