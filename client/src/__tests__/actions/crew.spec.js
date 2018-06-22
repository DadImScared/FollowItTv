
import axios from 'axios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import { addCrew, handleCrewData, requestCrew } from '../../actions/crew';

jest.mock('axios');

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('crew', () => {
  test('addCrew', () => {
    expect(addCrew({ id: 1, people: { 1: { id: 1 } } })).toMatchSnapshot();
  });

  test('handleCrewData', () => {
    const data = [
      {
        type: 'creator',
        person: {
          id: 1
        }
      },
      {
        type: 'role two',
        person: {
          id: 1
        }
      },
      {
        type: 'executive producer',
        person: {
          id: 2
        }
      }
    ];
    const results = handleCrewData(data);
    expect(results).toMatchSnapshot();
  });

  test('requestCrew', async () => {
    axios.get.mockImplementationOnce(() => ({
      data: [
        {
          type: 'role1',
          person: {
            id: 1
          }
        },
        {
          type: 'role2',
          person: {
            id: 2
          }
        }
      ]
    }));
    const store = mockStore({ people: {}, crew: {} });
    await store.dispatch(requestCrew(1));
    expect(store.getActions()).toMatchSnapshot();
  });
});
