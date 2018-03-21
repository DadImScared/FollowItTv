
import * as followedShowsTypes from '../actiontypes/followedShows';

import reducer from './followedShows';


const initialState = {
  monday: [1, 2, 3],
  tuesday: [2, 10],
  thursday: [3, 11]
};

describe('followedShowsReducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should add day to state', () => {
    expect(
      reducer({}, {
        type: followedShowsTypes.ADD_DAY,
        shows: [1, 2, 3],
        day: 'monday'
      })
    ).toEqual({
      'monday': [1, 2, 3]
    });
  });

  it('should update lists on selected days', () => {
    expect(
      reducer(initialState, {
        type: followedShowsTypes.FOLLOW_SHOW,
        id: 7,
        days: ['monday', 'thursday']
      })
    ).toEqual({
      monday: [1, 2, 3, 7],
      tuesday: [2, 10],
      thursday: [3, 11, 7]
    });
  });

  it('should remove shows in lists on selected days', () => {
    expect(
      reducer(initialState, {
        type: followedShowsTypes.UNFOLLOW_SHOW,
        id: 2,
        days: ['monday', 'tuesday']
      })
    ).toEqual({
      monday: [1, 3],
      tuesday: [10],
      thursday: [3, 11]
    });
  });
});
