
import axios from 'axios';
import Cookies from 'js-cookie';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';

import { LOG_OUT } from '../../actiontypes/users';
import { registerUser, logIn, logOut, logInUser } from '../../actions/users';

jest.mock('axios');

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);


const payload = {
  email: 'thing@mail.com',
  password1: 'password',
  password2: 'password'
};

const success = {
  data: 'success'
};

describe('user actions', () => {
  describe('registerUser', () => {
    it('should return success on valid payload', async () => {
      axios.post.mockImplementationOnce(() => success);
      const { data } = await registerUser(payload);

      expect(data).toEqual('success');
    });

    it('should throw error on invalid payload', async () => {
      axios.post.mockImplementationOnce(() => {
        throw {
          response: {
            data: 'error'
          }
        };
      });
      try {
        await registerUser({});
      }
      catch ({ response: { data } }) {
        expect(data).toEqual('error');
      }
    });
  });

  describe('logIn', () => {
    it('should create logIn action', () => {
      expect(logIn()).toMatchSnapshot();
    });
  });

  describe('logOut', () => {
    it('should create logOut action', () => {
      const expectedAction = {
        type: LOG_OUT
      };
      expect(logOut()).toEqual(expectedAction);
    });
  });

  describe('logInUser', () => {
    test('successful login', async () => {
      axios.post.mockImplementationOnce(() => ({ data: { key: 'token here' } }));
      const spyCookie = sinon.spy(Cookies, 'set');
      const store = mockStore({});
      await store.dispatch(logInUser({ email: 'awwad', password: 'aawdoi' }));
      expect(store.getActions()).toMatchSnapshot();
      expect(spyCookie.called).toEqual(true);
    });
  });
});
