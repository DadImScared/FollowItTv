
import sinon from 'sinon';

import { applyValidation, removeValidateString } from '../../../components/withFormState/utility';

function delayPromise(duration) {
  return new Promise(function(resolve){
    setTimeout(function(){
      resolve(duration);
    }, duration);
  });
}

const nothing = sinon.spy(() => ({}));
const badInput = sinon.spy(() => ({ password1: 'length short' }));
const tooShort = sinon.spy(() => ({ password1: 'username taken' }));
const comparePassword = sinon.spy(() => ({ password1: 'passwords must match', password2: 'passwords must match' }));
const delayed = sinon.spy(() => delayPromise(100));

const validators = [nothing, badInput, tooShort, comparePassword, delayed];


describe('applyValidation', () => {
  it('should validate', async () => {
    const results = await applyValidation({}, {}, 'idhere', validators);

    expect(results).toEqual({
      password1: 'length short, username taken, passwords must match',
      password2: 'passwords must match'
    });

    validators.forEach((validator) => {
      expect(validator.calledOnce).toEqual(true);
    });
  });

  it('should removeValidationString if valid', () => {
    const data = {
      email: 'bad email'
    };
    let errors = {
      email: 'bad email'
    };
    removeValidateString(data, 'email', errors);
    expect(Object.keys(errors)).toHaveLength(0);

    errors = {
      email: 'invalid format, bad email'
    };
    removeValidateString(data, 'email', errors);
    expect(errors['email']).toEqual('invalid format');
  });
});
