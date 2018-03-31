
import * as actionTypes from '../../actiontypes/seasons';
import reducer from '../../reducers/seasons';


describe('seasons reducer', () => {
  it('should return initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({ byId: {}, seasonEpisodes: {} });
  });

  it('should add seasons', () => {
    const seasons = {
      1: {},
      2: {}
    };
    expect(
      reducer(undefined, {
        type: actionTypes.ADD_SEASONS,
        showId: 1,
        seasons
      })
    ).toEqual({
      byId: {
        1: seasons
      },
      seasonEpisodes: {}
    });
  });

  it('should add season episodes', () => {
    const episodes = [1, 2];
    expect(
      reducer(undefined, {
        type: actionTypes.ADD_SEASON_EPISODES,
        seasonId: 1,
        episodes
      })
    ).toEqual({
      byId: {},
      seasonEpisodes: {
        1: episodes
      }
    });
  });
});
