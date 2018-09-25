
import { ADD_EPISODES } from '../actiontypes/episodes';


function episodes(state={}, action) {
  switch (action.type) {
  case ADD_EPISODES:
    return {
      ...state,
      ...action.episodes
    };
  default:
    return state;
  }
}

export const getEpisodes = (state) => state.episodes;

export default episodes;
