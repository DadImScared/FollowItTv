
import { makeFollowedShows } from '../../reducers/followedShows';

describe('selectors', () => {
  test('makeFollowedShows', () => {
    const state = {
      shows: { 1: { name: 'show1' } },
      followedShowsById: [1]
    };
    const followedShows = makeFollowedShows();
    expect(followedShows(state, { day: 'All' })).toMatchSnapshot();
  });
});
