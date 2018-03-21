
import * as followedShowsTypes from '../../actiontypes/followedShows';
import * as actions from '../../actions/followedShows';


describe('actions', () => {
  const days = ['monday', 'thursday', 'sunday'];

  it('should create add day action', () => {
    const expectedAction = {
      type: followedShowsTypes.ADD_DAY,
      day: 'tuesday',
      shows: [1, 43, 2]
    };
    expect(actions.addDay('tuesday', [1, 43, 2])).toEqual(expectedAction);
  });

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
