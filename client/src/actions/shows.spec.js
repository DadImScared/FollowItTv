
import * as showActionTypes from '../actiontypes/shows';
import * as actions from './shows';

describe('show actions', () => {
  it('should create add show action', () => {
    const expectedAction = {
      type: showActionTypes.ADD_SHOW,
      id: 2,
      payload: {}
    };
    expect(actions.addShow(2, {})).toEqual(expectedAction);
  });
});
