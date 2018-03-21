
import axios from 'axios';

import * as scheduleActionTypes from '../actiontypes/schedule';


export const addSchedule = (date, episodes) => {
  return {
    type: scheduleActionTypes.ADD_SCHEDULE,
    date,
    episodes
  };
};

export const getSchedule = async (date) => await axios.get(`/api/v1/schedule/${date}/`);
