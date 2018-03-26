
import axios from 'axios';

import { registerUser, reSendEmailConfirm } from '../../actions/users';

jest.mock('axios');


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
});
