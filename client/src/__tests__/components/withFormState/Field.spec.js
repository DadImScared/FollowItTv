
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';

import TextField from '@material-ui/core/TextField';

import { Field } from '../../../components/withFormState/Field';

describe('Field', () => {
  let props;

  beforeEach(() => {
    props = {
      id: 'field 1',
      updateForm: sinon.spy()
    };
  });

  it('should render', () => {
    const wrapper = shallow(<Field {...props}><TextField value={'taco'}/></Field>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
