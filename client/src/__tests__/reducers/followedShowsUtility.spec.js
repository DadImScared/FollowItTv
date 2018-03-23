
import { followShow, unfollowShow } from '../../reducers/followedShowsUtility';


describe('followShow', () => {
  it('should concat current shows with new show', () => {
    expect(followShow([1, 2, 3], { id: 4 })).toEqual([1, 2, 3, 4]);
  });
});

describe('unfollowShow', () => {
  it('should remove show id from list of shows', () => {
    expect(unfollowShow([1, 2, 3], { id: 2 })).toEqual([1, 3]);
  });
});
