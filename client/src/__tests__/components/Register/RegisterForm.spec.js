
import React from 'react';

import { shallow } from 'enzyme';
import sinon from 'sinon';

import RegisterForm from '../../../components/Register/RegisterForm';


describe('RegisterForm', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      updateForm: sinon.spy(() => {}),
      submit: sinon.spy(() => {}),
      form: {},
      formErrors: {}
    };
    wrapper = shallow(<RegisterForm {...props} />);
  });

  it('should render', () => {
    expect(wrapper.find('form')).toHaveLength(1);
    expect(wrapper.find('TextField')).toHaveLength(3);
    expect(wrapper.find('WithStyles(Button)')).toHaveLength(1);
  });

  it('should submit', () => {
    wrapper.find('form').simulate('submit');
    expect(props.submit.calledOnce).toEqual(true);
  });

  it('should call updateForm on input change', () => {
    wrapper.find('TextField').forEach((node) => {
      node.simulate('change');
    });

    expect(props.updateForm.calledThrice).toEqual(true);
  });
});
