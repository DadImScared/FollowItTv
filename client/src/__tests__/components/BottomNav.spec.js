
import React from 'react';

import sinon from 'sinon';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { BottomNav } from '../../components/BottomNav';

describe('BottomNav', () => {
  let props;
  beforeEach(() => {
    props = {
      location: {
        pathname: '/schedule'
      },
      history: {
        push: sinon.spy()
      },
      classes: {
        navBar: 'navBar',
        hideNavBar: 'hideNavBar',
        showNavBar: 'showNavBar'
      },
      bottomOfPage: false,
      directionDown: false,
      navDrawerOpen: false,
      toggleNavdrawer: sinon.spy()
    };
  });

  it('should render', () => {
    const wrapper = shallow(<BottomNav {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('click Menu icon', () => {
    const wrapper = shallow(<BottomNav {...props} />);
    const instance = wrapper.instance();
    instance.handleChange({}, 1);
    expect(props.toggleNavdrawer.calledOnce).toEqual(true);
    expect(instance.state.value).toEqual(1);
  });

  test('click my shows icon', () => {
    const wrapper = shallow(<BottomNav {...props} />);
    const instance = wrapper.instance();
    instance.handleChange({}, 2);
    expect(props.history.push.calledOnce).toEqual(true);
  });

  test('click clock icon', () => {
    const wrapper = shallow(<BottomNav {...{ ...props, location: { pathname: '/my_shows' } }} />);
    const instance = wrapper.instance();
    instance.handleChange({}, 0);
    expect(props.history.push.calledOnce).toEqual(true);
  });

  it('should change to schedule when route pathname changes to /schedule/*', () => {
    const newProps = { ...props };
    newProps.location.pathname = '/my_shows';
    const wrapper = shallow(<BottomNav {...newProps} />);
    wrapper.setProps({ location: { pathname: '/schedule ' } });
    expect(wrapper.state()).toMatchSnapshot();
  });

  it('should change to my shows when route pathname changes to /my_shows/*', () => {
    const wrapper = shallow(<BottomNav {...props} />);
    wrapper.setProps({ location: { pathname: '/my_shows' } });
    expect(wrapper.state()).toMatchSnapshot();
  });

  it('should change to my shows when nav drawer closes and pathname is under /my_shows/*', () => {
    const wrapper = shallow(<BottomNav {...{ ...props, navDrawerOpen: true }} />);
    wrapper.setState({ value: 1 }); // menu icon clicked
    wrapper.setProps({ navDrawerOpen: false }); // menu closed
    expect(wrapper.state()).toMatchSnapshot();
  });
});
