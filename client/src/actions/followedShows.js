
import * as followedActionTypes from '../actiontypes/followedShows';

export const addDay = (day, shows) => {
  return {
    type: followedActionTypes.ADD_DAY,
    day,
    shows
  };
};

export const followShow = (days, id) => {
  return {
    type: followedActionTypes.FOLLOW_SHOW,
    days,
    id
  };
};

export const unfollowShow = (days, id) => {
  return {
    type: followedActionTypes.UNFOLLOW_SHOW,
    days,
    id
  };
};
