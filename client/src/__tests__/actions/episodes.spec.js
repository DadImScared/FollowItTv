
import { ADD_EPISODES } from '../../actiontypes/episodes';
import * as actions from '../../actions/episodes';


describe('actions', () => {
  it('should create addEpisode action', () => {
    const episodes = {
      1: {
        name: 'episode0',
        show: 1
      }
    };
    const expectedAction = {
      type: ADD_EPISODES,
      episodes
    };
    expect(actions.addEpisodes(episodes)).toEqual(expectedAction);
  });
});
