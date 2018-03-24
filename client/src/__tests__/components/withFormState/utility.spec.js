
import sinon from 'sinon';

import { applyValidation } from '../../../components/withFormState/utility';

function delayPromise(duration) {
  return new Promise(function(resolve){
    setTimeout(function(){
      resolve(duration);
    }, duration);
  });
}

const nothing = sinon.spy(() => {});
const badInput = sinon.spy(() => ('length short'));
const tooShort = sinon.spy(() => ('username taken'));
const delayed = sinon.spy(() => delayPromise(100));

const validators = [nothing, badInput, tooShort, delayed];


describe('applyValidation', () => {
  it('should validate', async () => {
    const results = await applyValidation({}, {}, 'idhere', validators);

    expect(results).toEqual('length short, username taken, 100');

    validators.forEach((validator) => {
      expect(validator.calledOnce).toEqual(true);
    });
  });
});
