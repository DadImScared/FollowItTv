
import { combineReducers } from 'redux';

import followedShows from './followedShows';
import followedShowsById from './followedShowsId';
import shows from './shows';
import schedule from './schedule';
import users from './users';
import episodes from './episodes';
import seasons from './seasons';
import search from './search';

const reducer = combineReducers({
  followedShows,
  followedShowsById,
  seasons,
  episodes,
  shows,
  schedule,
  users,
  search
});

export default reducer;
