
import axios from 'axios';
import { ADD_SEASONS, ADD_SEASON_EPISODES } from '../actiontypes/seasons';
import { loadingStart, loadingEnd } from './loading';
import { seasonEpisodesLoading } from '../loadingIds';


export const baseUrl = 'http://api.tvmaze.com/';

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

export const getSeasons = async (showId) => {
  return await axios.get(`${baseUrl}shows/${showId}/seasons`);
};

export const getSeasonEpisodes = async (seasonId) => {
  return await axios.get(`${baseUrl}seasons/${seasonId}/episodes`);
};

// work in progress
export const findSeasonEpisodes = (seasonId, showId) => {
  return async (dispatch) => {
    const loadingId = seasonEpisodesLoading(seasonId);
    dispatch(loadingStart(loadingId));
    const { data } = await axios.get(`${baseUrl}seasons/${seasonId}/episodes`);
  };
};

export const normalizeSeasonEpisodes = (showId, episodes) => {
  const episodeList = [];
  const newEpisodes = {};
  episodes.forEach((episode) => {
    episodeList.push(episode.id);
    newEpisodes[episode.id] = {
      ...episode,
      show: showId
    };
  });

  return {
    episodeList,
    newEpisodes
  };
};
