
import axios from 'axios';

import * as showActionTypes from '../actiontypes/shows';

export const addShow = (id, payload) => {
  return {
    type: showActionTypes.ADD_SHOW,
    id,
    payload
  };
};

export const addShows = (shows) => {
  return {
    type: showActionTypes.ADD_SHOWS,
    shows
  };
};

export const updateShow = (id, key, value) => ({
  type: showActionTypes.UPDATE_SHOW,
  id,
  key,
  value
});

export const getShow = async (showId) => {
  return await axios.get(`http://api.tvmaze.com/shows/${showId}`);
};
