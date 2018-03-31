
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

export const getEpisodesAndShows = (initialEpisodes) => {
  // we want to remove show info from episodes and replace with show id while also extracting show info
  const episodeIds = [];
  const episodes = {};
  const shows = {};
  initialEpisodes.forEach((obj) => {
    episodeIds.push(obj.id);
    episodes[obj.id] = {
      ...obj,
      show: obj.show.id
    };
    shows[obj.show.id] = {
      ...obj.show
    };
  });
  return {
    episodeIds,
    episodes,
    shows
  };
};
