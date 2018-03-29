
import React from 'react';

import axios from 'axios';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import withFormState from '../../../components/withFormState';
import { Login } from '../../../components/Login/index';


jest.mock('axios');


describe('Login', () => {
  let wrapper;
  let Component;
  let instance;
  let props;
  let event;

  beforeEach(() => {
    event = { preventDefault: () => {} };
    props = {
      history: {
        push: sinon.spy(() => {})
      },
      logIn: sinon.spy(() => {})
    };
    Component = withFormState(Login);
    wrapper = shallow(<Component {...props} />);
    instance = wrapper.dive().instance();
  });

  it('should render', () => {
    expect(wrapper.dive().find('WithStyles(View)')).toHaveLength(1);
  });

  it('should log in', async () => {
    axios.post.mockImplementationOnce(() => ({ data: { key: 'key' } }));
    await instance.submit(event);
    expect(props.logIn.calledOnce).toEqual(true);
    expect(props.history.push.calledOnce).toEqual(true);
  });

  it('should handle email not verified error', async () => {
    const response = {
      response: {
        data: {
          non_field_errors: ['E-mail is not verified.']
        }
      }
    };
    axios.post.mockImplementationOnce(() => {
      throw response;
    });
    await instance.submit(event);
    expect(instance.state.shouldShow).toEqual(true);
  });
});
