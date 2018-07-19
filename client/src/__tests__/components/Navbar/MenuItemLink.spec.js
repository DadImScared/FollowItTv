
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import MenuItem from '@material-ui/core/MenuItem';

import MenuItemLink from '../../../components/Navbar/MenuItemLink';

describe('MenuItemLink', () => {
  let props;

  beforeEach(() => {
    props = {
      handleClose: sinon.spy(),
      routeName: '/register',
      text: 'Sign up'
    };
  });

  it('should render', () => {
    const wrapper = shallow(<MenuItemLink {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleClose on click', () => {
    const wrapper = shallow(<MenuItemLink {...props} />);
    wrapper.find(MenuItem).simulate('click');
    expect(props.handleClose.calledOnce).toEqual(true);
  });
});
