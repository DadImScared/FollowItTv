
import _ from 'lodash';
import { createSelector } from 'reselect';

import * as followedShowsTypes from '../actiontypes/followedShows';
import { followShow, unfollowShow } from './followedShowsUtility';
import { getLoading } from './loading';
import { getShows } from './shows';


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

const getFollowedShowsByDay = (state, { day }) => {
  return !day || day === 'All' ? state.followedShowsById : state.followedShows[day] || [];
};

export const getFollowedShows = createSelector(
  [getFollowedShowsByDay, getShows],
  (followedShows, shows) => _.sortBy(followedShows.map((id) => shows[id]), ['name'])
);

export const makeFollowedShowData = () => {
  return createSelector(
    [getFollowedShows, getLoading('MY_SHOWS_', 'day', 'All')],
    (followedShows, isLoading) => ({ followedShows, isLoading, isCached: followedShows.length  })
  );
};

export default followedShows;
