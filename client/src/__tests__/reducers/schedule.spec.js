
import * as scheduleActionTypes from '../../actiontypes/schedule';
import reducer from '../../reducers/schedule';

const initialState = {
  '2018-03-15': [{ name: 'episode0' }, { name: 'episode1' }]
};

describe('schedule reducer', () => {
  const date = '2018-03-17';
  const episodes = [{ name: 'episode0' }, { name: 'episode1' }];
  it('should add schedule', () => {
    expect(
      reducer({}, {
        type: scheduleActionTypes.ADD_SCHEDULE,
        date,
        episodes
      })
    ).toEqual({ [date]: episodes });
  });

  it('should add to existing schedule', () => {
    expect(
      reducer(initialState, {
        type: scheduleActionTypes.ADD_SCHEDULE,
        date,
        episodes
      })
    ).toEqual({ ...initialState, [date]: episodes });
  });
});
