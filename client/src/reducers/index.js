
import { combineReducers } from 'redux';

import characters from './characters';
import crew from './crew';
import episodes from './episodes';
import followedShows from './followedShows';
import followedShowsById from './followedShowsId';
import loading from './loading';
import people from './people';
import schedule from './schedule';
import scroll from './scroll';
import search from './search';
import seasons from './seasons';
import shows from './shows';
import showCharacters from './showCharacters';
import users from './users';


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
  showCharacters,
  crew,
  scroll
});

export default reducer;
