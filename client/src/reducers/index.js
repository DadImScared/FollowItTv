
import { combineReducers } from 'redux';

import followedShows from './followedShows';
import shows from './shows';
import schedule from './schedule';
import users from './users';

const reducer = combineReducers({
  followedShows,
  shows,
  schedule,
  users
});

export default reducer;
