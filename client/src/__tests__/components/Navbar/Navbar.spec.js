
import React from 'react';

import sinon from 'sinon';
import { shallow } from 'enzyme';

import { Navbar } from '../../../components/Navbar';

describe('Navbar', () => {
  let props;

  beforeEach(() => {
    props = {
      classes: {
        appBar: 'appbar',
        hideNavBar: 'hideNav',
        showNavBar: 'showNav'
      },
      loggedIn: true,
      directionDown: true,
      history: {
        push: sinon.spy()
      }
    };
  });
  
  it('should render logged in options if loggedIn', () => {
    const wrapper = shallow(<Navbar {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render logged out options if loggedIn = false', () => {
    const wrapper = shallow(<Navbar {...{ ...props, loggedIn: false }} />);
    expect(wrapper).toMatchSnapshot();
  });
});
