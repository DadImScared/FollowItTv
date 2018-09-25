
import { createSelector } from 'reselect';

import { ADD_SEASONS, ADD_SEASON_EPISODES } from '../actiontypes/seasons';
import { getEpisodes } from './episodes';
import { getLoading } from './loading';

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

export const getSeasonEpisodes = (state, { season: { id } }) => state.seasons.seasonEpisodes[id] || [];

export const makeSeasonEpisodes = () => {
  return createSelector(
    [getSeasonEpisodes, getEpisodes, getLoading('SHOW_SEASONS_', 'season.id')],
    (seasonEpisodes, episodes, isLoading) => ({
      episodes: seasonEpisodes.map((episodeId) => episodes[episodeId]),
      isLoading,
      hasData: seasonEpisodes.length
    })
  );
};

export default seasons;
