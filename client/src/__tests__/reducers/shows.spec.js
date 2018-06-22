
import * as showActionTypes from '../../actiontypes/shows';
import reducer from '../../reducers/shows';

const initialShows = {
  5: {
    name: 'x files',
    id: 5
  },
  10: {
    name: 'tom and jerry',
    id: 10
  },
  1: {
    name: 'breaking bad',
    id: 1
  }
};

const shows = {
  1: {
    name: 'breaking bad',
    id: 1
  },
  2: {
    name: 'under the dome',
    id: 2
  }
};

describe('shows', () => {
  it('should add show', () => {
    const payload = { name: 'show1' };
    expect(
      reducer({},{
        type: showActionTypes.ADD_SHOW,
        id: 2,
        payload
      })
    ).toEqual({
      2: {
        ...payload
      }
    });
  });

  it('should add shows', () => {
    expect(
      reducer({}, {
        type: showActionTypes.ADD_SHOWS,
        shows
      })
    ).toEqual(shows);
  });

  it('should add shows to existing shows', () => {
    expect(
      reducer(initialShows, {
        type: showActionTypes.ADD_SHOWS,
        shows
      })
    ).toEqual({ ...initialShows, ...shows });
  });

  it('should update show', () => {
    expect(
      reducer(initialShows, {
        type: showActionTypes.UPDATE_SHOW,
        id: 5,
        key: 'crew',
        value: [1, 2]
      })
    ).toMatchSnapshot();
  });
});
