
import axios from 'axios';
import { addCharacters, requestCast, handleCastData } from '../../actions/characters';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

jest.mock('axios');

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('characters', () => {
  test('addCharacters', () => {
    expect(addCharacters({
      characters: { 1: { id: 1, name: 'character1' } }
    })).toMatchSnapshot();
  });

  test('requestCast', async () => {
    axios.get.mockImplementationOnce(() => ({ data: [] }));
    const store = mockStore({ schedule: {} });
    await store.dispatch(requestCast(1));
    expect(store.getActions()).toMatchSnapshot();
  });

  test('handleCastData', () => {
    const data = [
      {
        person: { id: 5, name: 'person5' },
        character: { id: 1, name: 'character1' }
      },
      {
        person: { id: 2, name: 'person2' },
        character: { id: 2, name: 'character2' }
      }
    ];
    const results = handleCastData(data);
    expect(results).toMatchSnapshot();
  });
});
