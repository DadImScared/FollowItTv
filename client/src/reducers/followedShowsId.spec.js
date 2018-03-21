
import * as followedShowsTypes from '../actiontypes/followedShows';

import reducer from './followedShowsId';


describe('followedShowsId', () => {
  it('should return initial state', () => {
    expect(
      reducer([], {})
    ).toEqual([]);
  });

  it('should add show to list', () => {
    expect(
      reducer([], {
        type: followedShowsTypes.FOLLOW_SHOW,
        id: 1
      })
    ).toEqual([1]);
  });

  it('should remove show from list', () => {
    expect(
      reducer([1, 2, 10], {
        type: followedShowsTypes.UNFOLLOW_SHOW,
        id: 10
      })
    ).toEqual([1, 2]);
  });
});
