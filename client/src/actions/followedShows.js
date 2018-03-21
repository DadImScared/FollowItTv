
import * as followedActionTypes from '../actiontypes/followedShows';


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
