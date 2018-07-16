
import { makeFollowedShowData } from '../../reducers/followedShows';

describe('selectors', () => {
  test('makeFollowedShowData with no day', () => {
    const state = {
      shows: { 1: { name: 'show1' } },
      followedShowsById: [1],
      loading: {
        'MY_SHOWS_All': true
      },
      followedShows: {
        'Wednesday': [1]
      }
    };
    const followedShows = makeFollowedShowData();
    followedShows(state, {});
    followedShows(state, {});
    expect(followedShows.recomputations()).toEqual(1);
    expect(followedShows(state, {})).toMatchSnapshot();
  });
});
