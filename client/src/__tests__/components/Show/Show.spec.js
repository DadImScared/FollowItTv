
import React from 'react';

import axios from 'axios';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { Show } from '../../../components/Show/index';

jest.mock('axios');


describe('Show', () => {
  let wrapper;
  let instance;
  let props;

  axios.get.mockImplementation(() => ({
    data: {
      id: 1,
      name: 'under the dome'
    }
  }));

  beforeEach(() => {
    props = {
      shows: {},
      addShow: sinon.spy(),
      location: {
        pathname: '/shows/1/general'
      },
      match: {
        params: {
          showId: 1
        },
        url: '/shows/1'
      },
      history: {
        push: sinon.spy()
      }
    };

    wrapper = shallow(<Show {...props} />);
    instance = wrapper.instance();
  });

  it('should render', () => {
    const expectedProps = [
      'addShow', 'currentTab', 'handleChange',
      'handleChangeIndex', 'history', 'location',
      'show', 'match'
    ];
    const spied = sinon.spy(instance, 'setInitialTab');
    instance.componentDidMount();
    expect(spied.calledOnce).toEqual(true);
    expect(props.addShow.calledOnce).toEqual(true);
    expect(wrapper.find('View')).toHaveLength(1);
    Object.keys(wrapper.find('View').props()).forEach((prop) => {
      expect(expectedProps.includes(prop)).toEqual(true);
    });
  });

  it('should change tabs on mount if pathname includes one of ["seasons", "cast", "crew"]', () => {
    props.location.pathname = '/shows/1/seasons';
    wrapper = shallow(<Show {...props} />);
    instance = wrapper.instance();
    instance.componentDidMount();
    expect(instance.state.currentTab).toEqual(1);
  });

  test('handleChange', () => {
    instance.handleChange(undefined, 2);
    expect(props.history.push.calledOnce).toEqual(true);
    expect(instance.state.currentTab).toEqual(2);
  });

  test('handleChangeIndex', () => {
    instance.handleChangeIndex(1);
    expect(props.history.push.calledOnce).toEqual(true);
    expect(instance.state.currentTab).toEqual(1);
  });
});
