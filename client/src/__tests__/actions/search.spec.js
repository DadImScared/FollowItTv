
import * as actions from '../../actions/search';
import { ADD_SEARCH } from '../../actiontypes/search';
import axios from 'axios';
import sinon from 'sinon';

jest.mock('axios');


describe('actions', () => {
  test('addSearch action creators', () => {
    const expectedAction = {
      type: ADD_SEARCH,
      query: 'show',
      results: [1]
    };
    expect(actions.addSearch('show', [1])).toEqual(expectedAction);
  });

  test('extractData', () => {
    const shows = [
      { id: 1, name: 'show1' },
      { id: 2, name: 'show2' }
    ];
    const data = [
      { show: shows[0] },
      { show: shows[1] }
    ];
    expect(actions.extractData(data)).toEqual({
      shows: [1, 2],
      showsInfo: {
        1: shows[0],
        2: shows[1]
      }
    });
  });

  test('searchShows', async () => {
    axios.get.mockImplementation(() => ({ data: [] }));
    const dispatch = sinon.spy();
    await actions.searchShows(dispatch, 'show');
    expect(dispatch.calledTwice).toEqual(true);
  });
});
