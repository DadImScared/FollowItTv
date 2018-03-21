
import * as scheduleActionTypes from '../actiontypes/schedule';


function schedule(state={}, action) {
  switch(action.type) {
  case scheduleActionTypes.ADD_SCHEDULE:
    return {
      ...state,
      [action.date]: action.episodes
    };
  default:
    return state;
  }
}

export default schedule;
