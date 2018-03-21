
import * as followedShowsTypes from '../actiontypes/followedShows';
import * as actions from './followedShows';


describe('actions', () => {
  const days = ['monday', 'thursday', 'sunday'];

  it('should create follow show action', () => {
    const expectedAction = {
      type: followedShowsTypes.FOLLOW_SHOW,
      days,
      id: 2
    };
    expect(actions.followShow(days, 2)).toEqual(expectedAction);
  });

  it('should create unfollow show action', () => {
    const expectedAction = {
      type: followedShowsTypes.UNFOLLOW_SHOW,
      days,
      id: 1
    };
    expect(actions.unfollowShow(days, 1)).toEqual(expectedAction);
  });
});
