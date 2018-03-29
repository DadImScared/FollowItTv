
import { LOG_OUT, LOG_IN } from '../../actiontypes/users';
import reducer from '../../reducers/users';


const initialState = {
  loggedIn: false,
  token: undefined
};

describe('users reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should log in', () => {
    expect(
      reducer(undefined, {
        type: LOG_IN,
        token: 'token'
      })
    ).toEqual({ loggedIn: true, token: 'token' });
  });

  it('should log out', () => {
    expect(
      reducer(undefined, {
        type: LOG_OUT
      })
    ).toEqual({ loggedIn: false, token: '' });
  });
});
