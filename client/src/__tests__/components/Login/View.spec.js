
import React from 'react';

import { createShallow } from 'material-ui/test-utils';

import View from '../../../components/Login/View';


describe('View', () => {
  let wrapper;
  let shallow;

  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });

  beforeEach(() => {
    wrapper = shallow(<View />);
  });

  it('should render', () => {
    expect(wrapper.find('WithStyles(Typography)').render().text()).toEqual('Sign in');
    expect(wrapper.find('WithStyles(ReSendEmail)')).toHaveLength(1);
    expect(wrapper.find('LoginForm')).toHaveLength(1);
  });
});
