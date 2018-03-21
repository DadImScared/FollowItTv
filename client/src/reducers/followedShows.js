
import * as followedShowsTypes from '../actiontypes/followedShows';
import { followShow, unfollowShow } from './followedShowsUtility';


const updateShowInDay = (dayState, action, updateCb)=> {
  const updatedDays = action.days.filter((day) => day in dayState).map((day) => {
    return {
      [day]: updateCb(dayState[day], action)
    };
  }).reduce((obj, item) => ({ ...obj, ...item }), {});
  return {
    ...dayState,
    ...updatedDays
  };
};

function followedShows(state={}, action) {
  switch(action.type) {
  case followedShowsTypes.ADD_DAY:
    return {
      ...state,
      [action.day]: action.shows
    };
  case followedShowsTypes.UNFOLLOW_SHOW:
    return updateShowInDay(state, action, unfollowShow);
  case followedShowsTypes.FOLLOW_SHOW:
    return updateShowInDay(state, action, followShow);
  default:
    return state;
  }
}

export default followedShows;
