
import React from 'react';

import { shallow } from 'enzyme';

import { View } from '../../../components/Register/View';


const props = {
  classes: {
    wrapper: 'wrapper'
  },
  shouldShow: false,
  fadeProps: {},
  wrapperProps: {}
};

describe('View', () => {
  it('should render', () => {
    const wrapper = shallow(<View {...props} />);

    expect(wrapper.find('WithStyles(ReSendEmail)')).toHaveLength(1);
    expect(wrapper.find('RegisterForm')).toHaveLength(1);
  });
});
