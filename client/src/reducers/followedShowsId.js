
import _ from 'lodash';
import * as followedShowsTypes from '../actiontypes/followedShows';

import { followShow, unfollowShow } from './followedShowsUtility';

function followedShowsId(state=[], action) {
  switch(action.type) {
  case followedShowsTypes.FOLLOW_SHOW:
    return followShow(state, action);
  case followedShowsTypes.UNFOLLOW_SHOW:
    return unfollowShow(state, action);
  case followedShowsTypes.ADD_SHOW_IDS:
    return _.union(state, action.showIdList);
  default:
    return state;
  }
}

export default followedShowsId;
