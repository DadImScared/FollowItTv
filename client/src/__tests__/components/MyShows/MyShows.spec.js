
import React from 'react';

import axios from 'axios';
import { shallow } from 'enzyme';
import moment from 'moment';
import sinon from 'sinon';

import { MyShows } from '../../../components/MyShows/index';

jest.mock('axios');

describe('MyShows', () => {
  const _date = Date.now;
  let props;

  beforeEach(() => {
    props = {
      followedShows: {},
      followedShowsById: [],
      shows: {},
      location: {
        pathname: '/my_shows/All'
      },
      dispatch: sinon.spy()
    };
    moment.now = () => 1531716593863;
    axios.get.mockImplementation(() => ({ data: [] }));
    axios.post.mockImplementation(() => ({ data: [] }));
  });

  afterEach(() => {
    moment.now = _date;
  });

  test('unFollow', async () => {
    const wrapper = shallow(<MyShows {...props} />);
    const instance = wrapper.instance();
    await instance.unFollow({ schedule: { days: ['Monday'] }, id: 1 });
    expect(props.dispatch.calledOnce).toEqual(true);
    expect(instance.state).toMatchSnapshot('un follow while snackbar is closed');
    await instance.unFollow({ schedule: { days: ['Monday'] }, id: 1 });
    expect(instance.state).toMatchSnapshot('un follow while snackbar is open');
  });

  test('undoAction', async () => {
    const wrapper = shallow(<MyShows {...props} />);
    wrapper.setState({
      isOpen: true,
      undoData: {
        key: 0,
        show: { schedule: { days: ['Monday'] }, id: 1 }
      }
    });
    const instance = wrapper.instance();
    await instance.undoAction();
    expect(props.dispatch.calledOnce).toEqual(true);
    expect(instance.state).toMatchSnapshot();
  });

  test('setInitialTab', () => {
    const newProps = {
      ...props,
      location: {
        pathname: '/my_shows'
      }
    };
    const wrapper = shallow(<MyShows {...newProps} />);
    const instance = wrapper.instance();
    instance.setInitialTab(newProps);
    expect(instance.state.day).toEqual(0);
  });

  test('setInitialTab with day', () => {
    const newProps = {
      ...props,
      location: {
        pathname: '/my_shows/Monday'
      }
    };
    const wrapper = shallow(<MyShows {...newProps} />);
    const instance = wrapper.instance();
    instance.setInitialTab(newProps);
    expect(instance.state.day).toEqual(1);
  });
});
