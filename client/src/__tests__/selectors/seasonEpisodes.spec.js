
import { makeSeasonEpisodes } from '../../reducers/seasons';

describe('seasonEpisodes', () => {
  test('makeSeasonEpisodes', () => {
    const state = {
      seasons: {
        seasonEpisodes: {
          1: [1]
        }
      },
      episodes: {
        1: {
          id: 1,
          name: 'episode 1'
        }
      },
      loading: {
        'SHOW_SEASONS_1': false
      }
    };
    const props = {
      season: { id: 1 }
    };

    const getSeasonEpisodes = makeSeasonEpisodes();
    expect(getSeasonEpisodes.recomputations()).toEqual(0);
    const results = getSeasonEpisodes(state, props);
    getSeasonEpisodes(state, props);
    expect(getSeasonEpisodes.recomputations()).toEqual(1);
    expect(results).toMatchSnapshot();
  });
});
