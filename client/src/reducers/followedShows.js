
import * as followedShowsTypes from '../actiontypes/followedShows';
import { followShow, unfollowShow } from './followedShowsUtility';

// const updateShow = (showsState, action) => {
//   return showsState[action.id] ? {
//     ...showsState,
//     [action.id]: {
//       ...showsState[action.id],
//       isFollowing: action.isFollowing
//     }
//   }:{
//     ...showsState,
//     [action.id]: {
//       ...action.payload,
//       isFollowing: action.isFollowing
//     }
//   };
// };

// const followShow = (showState, action) => {
//   return showState.concat(action.id);
// };
//
// const unfollowShow = (showState, action) => {
//   return showState.filter((item) => item !== action.id);
// };

const updateShowInDay = (dayState, action, updateCb)=> {
  const updatedDays = action.days.map((day) => {
    if (dayState[day]) {
      return {
        [day]: updateCb(dayState[day], action)
      };
    }
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
