
import * as scheduleActionTypes from '../actiontypes/schedule';
import * as actions from './schedule';


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
});
