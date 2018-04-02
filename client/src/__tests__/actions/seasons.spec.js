
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

  test('normalizeSeasonEpisodes', () => {
    const episodes = [
      { id: 1 },
      { id: 2 }
    ];
    const expectedResults = {
      episodeList: [1, 2],
      newEpisodes: {
        1: { id: 1, show: 1 },
        2: { id: 2, show: 1 }
      }
    };
    const results = actions.normalizeSeasonEpisodes(1, episodes);
    expect(results).toEqual(expectedResults);
  });
});
