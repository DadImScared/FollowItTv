
import axios from 'axios';
import sinon from 'sinon';
import * as followedShowsTypes from '../../actiontypes/followedShows';
import * as actions from '../../actions/followedShows';

jest.mock('axios');


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

  it('should create addShowIds action', () => {
    const expectedAction = {
      type: followedShowsTypes.ADD_SHOW_IDS,
      showIdList: [1, 2]
    };
    expect(actions.addShowIds([1, 2])).toEqual(expectedAction);
  });

  test('extractShowData with array', () => {
    const expectedResult = { showIds: [], showData: {} };
    expect(actions.extractShowData([])).toEqual(expectedResult);
  });

  test('extractShowData with object', () => {
    const showIds = [1, 2];
    const showData = {
      1: { id: 1 },
      2: { id: 2 }
    };
    const expectedResult = { showIds, showData };
    expect(actions.extractShowData(
      [{ id: 1 }, { id: 2 }]
    )).toEqual(expectedResult);
  });

  test('getFollowedShows', async () => {
    const showList = [1, 2];
    const dispatch = sinon.spy();
    axios.get.mockImplementationOnce(() => ({ data: showList }));
    await actions.getFollowedShows(dispatch);
    expect(dispatch.calledOnce).toEqual(true);
  });
});
