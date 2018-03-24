
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
      expect(message).toEqual('Passwords must match');
    });

    it('should not return if passwords match', () => {
      const state = {
        form: {
          password1: 'asw',
          password2: 'asw'
        }
      };
      const message = passwordValidator(data.props, state, data.id);
      expect(message).toEqual(undefined);
    });

    it('should not return if one password field is empty', () => {
      let state = {
        form: {
          password1: 'awd'
        }
      };
      let message = passwordValidator(data.props, state, data.id);
      expect(message).toEqual(undefined);

      state = {
        form: {
          password2: 'awd'
        }
      };
      message = passwordValidator(data.props, state, data.id);
      expect(message).toEqual(undefined);
    });
  });

  describe('lengthValidator', () => {
    it('should return message if invalid length', () => {
      const message = lengthValidator(data.props, data.state, data.id);
      expect(message).toEqual('Password length must be 8 characters or more');
    });

    it('should not return message if valid length', () => {
      const state = {
        form: {
          password1: 'awdawdawdfawdawf'
        }
      };
      const message = lengthValidator(data.props, state, data.id);
      expect(message).toEqual(undefined);
    });
  });
});
