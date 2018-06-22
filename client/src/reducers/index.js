
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
import people from './people';
import characters from './characters';
import showCharacters from './showCharacters';

const reducer = combineReducers({
  followedShows,
  followedShowsById,
  seasons,
  episodes,
  shows,
  schedule,
  users,
  search,
  loading,
  people,
  characters,
  showCharacters
});

export default reducer;
