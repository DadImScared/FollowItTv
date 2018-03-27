
import React from 'react';

import { shallow } from 'enzyme';
import sinon from 'sinon';

import LoginForm from '../../../components/Login/LoginForm';


describe('LoginForm', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      updateForm: sinon.spy(() => {}),
      submit: sinon.spy(() => {}),
      form: {},
      formErrors: {}
    };
    wrapper = shallow(<LoginForm {...props} />);
  });

  it('should render', () => {
    expect(wrapper.find('form')).toHaveLength(1);
    expect(wrapper.find('TextField')).toHaveLength(2);
    expect(wrapper.find('WithStyles(Button)')).toHaveLength(1);
  });

  it('should call submit on form submit', () => {
    wrapper.find('form').simulate('submit');
    expect(props.submit.calledOnce).toEqual(true);
  });

  it('should call updateForm on input change', () => {
    wrapper.find('TextField').forEach((node) => {
      node.simulate('change');
    });
    expect(props.updateForm.calledTwice).toEqual(true);
  });
});
