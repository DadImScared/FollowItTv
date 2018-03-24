
import { applyValidation } from '../../../components/withFormState/utility';


const validators = [
  () => {},
  () => ('length short'),
  () => ('username taken')
];

describe('applyValidation', () => {
  it('should validate', () => {
    const results = applyValidation({}, {}, 'idhere', validators);
    expect(results).toEqual('length short, username taken');
  });
});
