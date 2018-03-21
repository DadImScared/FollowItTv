
import axios from 'axios';

import * as scheduleActionTypes from '../../actiontypes/schedule';
import * as actions from '../../actions/schedule';

jest.mock('axios');

// actions.getSchedule = jest.fn((date) => response[date]);


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
});
