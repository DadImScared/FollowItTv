
import { ADD_SEASONS, ADD_SEASON_EPISODES } from '../../actiontypes/seasons';
import * as actions from '../../actions/seasons';


describe('actions', () => {
  it('should create addSeasons action', () => {
    const seasons = {};
    const expectedAction = {
      type: ADD_SEASONS,
      showId: 1,
      seasons
    };
    expect(actions.addSeasons(1, seasons)).toEqual(expectedAction);
  });

  it('should create addSeasonEpisodes', () => {
    const episodes = [1, 2];
    const expectedAction = {
      type: ADD_SEASON_EPISODES,
      seasonId: 1,
      episodes
    };
    expect(actions.addSeasonEpisodes(1, episodes)).toEqual(expectedAction);
  });
});
