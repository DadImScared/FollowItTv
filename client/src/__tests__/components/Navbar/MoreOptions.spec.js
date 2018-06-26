
import React from 'react';

import sinon from 'sinon';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { MoreOptions } from '../../../components/Navbar/MoreOptions';

describe('MoreOptions', () => {
  it('should render logged in options if loggedIn', () => {
    const wrapper = shallow(<MoreOptions history={{ push: sinon.spy() }} loggedIn={true} logOut={sinon.spy()}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render logged out options if loggedIn false', () => {
    const wrapper = shallow(<MoreOptions history={{ push: sinon.spy() }} loggedIn={false} logOut={sinon.spy() }/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
