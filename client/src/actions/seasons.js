
import { ADD_SEASONS, ADD_SEASON_EPISODES } from '../actiontypes/seasons';


export const addSeasons = (showId, seasons) => {
  return {
    type: ADD_SEASONS,
    showId,
    seasons
  };
};

export const addSeasonEpisodes = (seasonId, episodes) => {
  return {
    type: ADD_SEASON_EPISODES,
    seasonId,
    episodes
  };
};
