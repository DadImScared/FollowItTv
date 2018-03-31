
import { ADD_SEASONS, ADD_SEASON_EPISODES } from '../actiontypes/seasons';


const initialState = {
  byId: {},
  seasonEpisodes: {}
};

function seasons(state=initialState, action) {
  switch (action.type) {
  case ADD_SEASONS:
    return {
      ...state,
      byId: {
        ...state.byId,
        [action.showId]: action.seasons
      }
    };
  case ADD_SEASON_EPISODES:
    return {
      ...state,
      seasonEpisodes: {
        ...state.seasonEpisodes,
        [action.seasonId]: action.episodes
      }
    };
  default:
    return state;
  }
}

export default seasons;
