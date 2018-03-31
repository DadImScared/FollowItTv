
import { combineReducers } from 'redux';

import followedShows from './followedShows';
import followedShowsById from './followedShowsId';
import shows from './shows';
import schedule from './schedule';
import users from './users';
import episodes from './episodes';

const reducer = combineReducers({
  followedShows,
  followedShowsById,
  episodes,
  shows,
  schedule,
  users
});

export default reducer;
