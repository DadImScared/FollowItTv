
import * as showActionTypes from '../../actiontypes/shows';
import reducer from '../../reducers/shows';

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
});
