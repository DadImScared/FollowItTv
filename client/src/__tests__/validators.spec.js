
import { passwordValidator, lengthValidator } from '../validators';


const data = {
  props: {},
  state: {
    form: {
      password1: '2e',
      password2: 'ww'
    }
  },
  id: 'password1'
};


describe('validators', () => {

  describe('passwordValidator', () => {
    it('should return an error message if password1 and password2 exist and are not the same', () => {
      const message = passwordValidator(data.props, data.state, data.id);
      expect(message).toEqual({ password1: 'Passwords must match' });
    });

    it('should return validation message/s with remove true if valid', () => {
      const state = {
        form: {
          password1: 'asw',
          password2: 'asw'
        }
      };
      const message = passwordValidator(data.props, state);
      expect(message).toEqual({
        password1: 'Passwords must match',
        password2: 'Passwords must match',
        remove: true
      });
    });

    it('should return validation messages with remove true if not all fields in validator exist', () => {
      let state = {
        form: {
          password1: 'awd'
        }
      };
      let message = passwordValidator(data.props, state, data.id);
      expect(message).toEqual({
        password1: 'Passwords must match',
        password2: 'Passwords must match',
        remove: true
      });

      state = {
        form: {
          password2: 'awd'
        }
      };
      message = passwordValidator(data.props, state, data.id);
      expect(message).toEqual({
        password1: 'Passwords must match',
        password2: 'Passwords must match',
        remove: true
      });
    });
  });

  describe('lengthValidator', () => {
    it('should return message if invalid length', () => {
      const message = lengthValidator(data.props, data.state, data.id);
      expect(message).toEqual({
        password1: 'Password length must be 8 characters or more'
      });
    });

    it('should return validation message with remove true if valid length', () => {
      const state = {
        form: {
          password1: 'awdawdawdfawdawf'
        }
      };
      const message = lengthValidator(data.props, state, data.id);
      expect(message).toEqual({
        password1: 'Password length must be 8 characters or more',
        remove: true
      });
    });
  });
});
