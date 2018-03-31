
import axios from 'axios';
import { ADD_EPISODES } from '../actiontypes/episodes';

export const addEpisodes = (episodes) => {
  return {
    type: ADD_EPISODES,
    episodes
  };
};

export const getEpisode = async (id) => {
  return await axios.get(`http://api.tvmaze.com/episodes/${id}`);
};
