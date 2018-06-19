
import axios from 'axios';

import * as scheduleActionTypes from '../actiontypes/schedule';
import { addEpisodes } from './episodes';
import { addShows } from './shows';
import { loadingStart, loadingEnd } from './loading';


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

export const requestSchedule = (date) => {
  return async (dispatch, getState) => {
    const { schedule, loading } = getState();
    const requestId = `GET_SCHEDULE_${date}`;
    if (schedule[date] || loading[requestId]) {
      return;
    }
    dispatch(loadingStart(requestId));
    try {
      const { data } = await getSchedule(date);
      const { episodes, shows, episodeIds } = getEpisodesAndShows(data);
      dispatch(addShows(shows));
      dispatch(addEpisodes(episodes));
      dispatch(addSchedule(date, episodeIds));
      dispatch(loadingEnd(requestId));
      return Promise.resolve();
    }
    catch (e) {
      dispatch(loadingEnd(requestId));
      throw e;
    }
  };
};
