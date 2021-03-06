
import _ from 'lodash';
import axios from 'axios';

import { loadingStart, loadingEnd } from './loading';
import axiosOptions from './axiosOptions';
import * as followedActionTypes from '../actiontypes/followedShows';
import { addShows } from './shows';

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

export const postFollow = async (showId) => {
  return await axios.post(`/api/v1/followshow/${showId}/`, {}, axiosOptions());
};

export const createFollowedShow = (days, showId) => {
  return async (dispatch) => {
    try {
      await postFollow(showId);
      dispatch(followShow(days, showId));
    }
    catch (e) {
      throw e;
    }
  };
};

export const deleteFollowedShow = (days, showId) => {
  return async (dispatch) => {
    try {
      await postFollow(showId);
      dispatch(unfollowShow(days, showId));
    }
    catch (e) {
      throw e;
    }
  };
};

export const addShowIds = (showIdList) => {
  return {
    type: followedActionTypes.ADD_SHOW_IDS,
    showIdList
  };
};

export const extractShowData = (data) => {
  let isArrayOfNumbers;
  const showIds = new Set();
  const showData = {};
  if (typeof data[0] === 'number') {
    isArrayOfNumbers = true;
  }
  else {
    data.forEach((show) => {
      showIds.add(show.id);
      showData[show.id] = show;
    });
  }
  return {
    showData,
    showIds: isArrayOfNumbers ? data:[...showIds]
  };
};

const isDay = (day) => {
  return day && day !== 'All';
};

export const getFollowedShows = async (dispatch, day = '') => {
  try {
    const { data } = await axios.get(`/api/v1/followedshows/${isDay(day) ? `${_.capitalize(day)}/`:''}`, axiosOptions());
    const { showData, showIds } = extractShowData(data);
    dispatch(addShows(showData));
    dispatch(addShowIds(showIds));
    if (isDay(day)) {
      dispatch(addDay(day, showIds));
    }
  }
  catch (e) {
    throw e;
  }
};

export const findFollowedShows = (day = 'All') => {
  return async (dispatch) => {
    const LOADING_ID = `MY_SHOWS_${day}`;
    dispatch(loadingStart(LOADING_ID));
    try {
      const { data } = await axios.get(
        `/api/v1/followedshows/${isDay(day) ? `${_.capitalize(day)}/`:''}`,
        axiosOptions()
      );
      const { showData, showIds } = extractShowData(data);
      dispatch(addShows(showData));
      dispatch(addShowIds(showIds));
      if (isDay(day)) {
        dispatch(addDay(day, showIds));
      }
      dispatch(loadingEnd(LOADING_ID));
    }
    catch (e) {
      dispatch(loadingEnd(LOADING_ID));
      throw e;
    }
  };
};
