
import { combineReducers } from 'redux';

import followedShows from './followedShows';
import followedShowsById from './followedShowsId';
import shows from './shows';
import schedule from './schedule';
import users from './users';
import episodes from './episodes';
import seasons from './seasons';
import search from './search';
import loading from './loading';

const reducer = combineReducers({
  followedShows,
  followedShowsById,
  seasons,
  episodes,
  shows,
  schedule,
  users,
  search,
  loading
});

export default reducer;
