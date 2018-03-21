
import { combineReducers } from 'redux';

import followedShows from './followedShows';
import shows from './shows';
import schedule from './schedule';

const reducer = combineReducers({
  followedShows,
  shows,
  schedule
});

export default reducer;
