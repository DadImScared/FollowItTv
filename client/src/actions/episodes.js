
import { ADD_EPISODES } from '../actiontypes/episodes';

export const addEpisodes = (episodes) => {
  return {
    type: ADD_EPISODES,
    episodes
  };
};
