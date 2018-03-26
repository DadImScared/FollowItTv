
import React from 'react';

import axios from 'axios';
import { shallow } from 'enzyme';

import Register from '../../../components/Register';


jest.mock('axios');


describe('Register', () => {

  it('should render', () => {
    const wrapper = shallow(<Register />);
    const inner = wrapper.dive();

    expect(inner.find('View')).toHaveLength(1);
  });

  it('should register user on submit', async () => {
    const wrapper = shallow(<Register />);
    const instance = wrapper.dive().instance();

    axios.post.mockImplementation(() => ({ data: 'success' }));
    expect(instance.state).toEqual({ shouldShow: false, email: '' });
    await instance.submit({ preventDefault: () => {} });
    expect(instance.state.shouldShow).toEqual(true);
  });
});
