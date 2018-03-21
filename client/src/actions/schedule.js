
import * as scheduleActionTypes from '../actiontypes/schedule';


export const addSchedule = (date, episodes) => {
  return {
    type: scheduleActionTypes.ADD_SCHEDULE,
    date,
    episodes
  };
};
