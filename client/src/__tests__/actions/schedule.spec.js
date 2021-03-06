
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';

import * as scheduleActionTypes from '../../actiontypes/schedule';
import * as actions from '../../actions/schedule';

jest.mock('axios');

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

// actions.getSchedule = jest.fn((date) => response[date]);

const shows = [
  {
    id: 1,
    name: 'breaking bad'
  },
  {
    id: 3,
    name: 'under the dome'
  }
];

const detailedResponse = {
  data: [
    {
      id: 1,
      name: 'episode0',
      show: shows[0]
    },
    {
      id: 2,
      name: 'episode2',
      show: shows[1]
    }
  ]
};

const date = '2011-03-26';

describe('schedule actions', () => {
  it('should create add schedule action', () => {
    const date = '2018-03-17';
    const episodes = [{ name: 'episode1' }];
    const expectedAction = {
      type: scheduleActionTypes.ADD_SCHEDULE,
      date,
      episodes
    };
    expect(actions.addSchedule(date, episodes)).toEqual(expectedAction);
  });

  it('should get schedule', async () => {
    const response = {
      data: [{ name: 'episode0' }]
    };
    axios.get.mockImplementation(() => response);
    const { data } = await actions.getSchedule('2018-03-17');
    expect(data).toEqual(response.data);
  });

  it('should get episodes and shows from initial episodes', async () => {
    axios.get.mockImplementation(() => detailedResponse);
    const { data } = await actions.getSchedule('2018-03-17');
    const { episodes, shows: newShows, episodeIds } = actions.getEpisodesAndShows(data);
    expect(episodeIds).toEqual([1, 2]);
    expect(episodes).toEqual({
      1: {
        id: 1,
        name: 'episode0',
        show: 1
      },
      2: {
        id: 2,
        name: 'episode2',
        show: 3
      }
    });
    expect(newShows).toEqual({
      [shows[0].id]: shows[0],
      [shows[1].id]: shows[1]
    });
  });

  test('get schedule', async () => {
    axios.get.mockImplementation(() => detailedResponse);
    const spy = sinon.spy(axios, 'get');
    const store = mockStore({ schedule: {} });
    await store.dispatch(actions.requestSchedule(date));
    expect(spy.called).toEqual(true);
    expect(store.getActions()).toMatchSnapshot();
  });

  test('get schedule does not make request if there is a current request for that schedule', async () => {
    axios.get.mockImplementation(() => detailedResponse);
    const spy = sinon.spy(axios, 'get');
    const store = mockStore({ schedule: {}, loading: { [`GET_SCHEDULE_${date}`]: true } });
    await store.dispatch(actions.requestSchedule(date));
    expect(spy.called).toEqual(false);
    expect(store.getActions()).toHaveLength(0);
  });

  test('get schedule does not make request if schedule exists', async () => {
    axios.get.mockImplementation(() => detailedResponse);
    const spy = sinon.spy(axios, 'get');
    const store = mockStore({ schedule: { [date]: [1, 2] } });
    await store.dispatch(actions.requestSchedule(date));
    expect(spy.called).toEqual(false);
    expect(store.getActions()).toHaveLength(0);
  });

  test('get schedule error', async () => {
    axios.get.mockImplementationOnce(() => {
      throw {
        response: {
          data: 'error'
        }
      };
    });
    const store = mockStore({ schedule: {}, loading: {} });
    try {
      await store.dispatch(actions.requestSchedule(date));
    }
    catch (e) {
      expect(store.getActions()).toMatchSnapshot();
    }
  });
});
