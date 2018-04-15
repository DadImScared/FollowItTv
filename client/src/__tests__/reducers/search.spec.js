
import { ADD_SEARCH } from '../../actiontypes/search';
import reducer from '../../reducers/search';


describe('search reducer', () => {
  it('should add search', () => {
    expect(
      reducer({}, {
        type: ADD_SEARCH,
        query: 'show',
        results: [1]
      })
    ).toEqual({
      show: [1]
    });
  });
});
