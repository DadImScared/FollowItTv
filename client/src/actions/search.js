
import axios from 'axios';
import { ADD_SEARCH } from '../actiontypes/search';
import { addShows } from './shows';


const searchUrl = 'http://api.tvmaze.com/search/shows?q=';

export const addSearch = (query, results) => {
  return {
    type: ADD_SEARCH,
    query,
    results
  };
};

export const extractData = (data) => {
  const shows = new Set();
  const showsInfo = {};
  data.forEach(({ show }) => {
    shows.add(show.id);
    showsInfo[show.id] = show;
  });
  return {
    showsInfo,
    shows: [...shows]
  };
};

export const searchShows = async (dispatch, query) => {
  const lowerQuery = query.toLowerCase();
  try {
    const { data } = await axios.get(`${searchUrl}${lowerQuery}`);
    const { shows, showsInfo } = extractData(data);
    dispatch(addShows(showsInfo));
    dispatch(addSearch(lowerQuery, shows));
  }
  catch (e) {
    throw e;
  }
};
