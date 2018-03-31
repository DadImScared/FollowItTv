
import { ADD_EPISODES } from '../../actiontypes/episodes';
import reducer from '../../reducers/episodes';


describe('episodes reducer', () => {
  it('should add episodes', () => {
    const episodes = {
      1: {},
      2: {}
    };
    expect(
      reducer({}, {
        type: ADD_EPISODES,
        episodes
      })
    ).toEqual(episodes);
  });
});
