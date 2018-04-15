
import React from 'react';

import axios from 'axios';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { MyShows } from '../../../components/MyShows/index';

jest.mock('axios');


const baseProps = () => ({
  followedShows: {},
  shows: {},
  location: {
    pathname: '/my_shows/All'
  },
  dispatch: sinon.spy(),
  followShow: sinon.spy(),
  unfollowShow: sinon.spy()
});

describe('MyShows', () => {
  let clock;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
    axios.get.mockImplementation(() => ({ data: [] }));
    axios.post.mockImplementation(() => ({ data: [] }));
  });

  afterEach(() => {
    clock.restore();
  });

  test('unFollow', async () => {
    const props = {
      ...baseProps()
    };
    const wrapper = shallow(<MyShows {...props} />);
    const instance = wrapper.instance();
    await instance.unFollow(['Monday'], 1);
    expect(instance.state).toEqual({
      isOpen: true,
      day: 0,
      undoData: {
        showId: 1,
        showDays: ['Monday']
      }
    });
    expect(props.unfollowShow.calledOnce).toEqual(true);
    await instance.unFollow(['Tuesday'], 2);
    const spied = sinon.spy(instance, 'makeRequest');
    clock.tick(100);
    expect(spied.calledOnce).toEqual(false);
    clock.tick(100);
    expect(spied.calledOnce).toEqual(true);
  });

  test('undoAction', async () => {
    const props = {
      ...baseProps()
    };
    const wrapper = shallow(<MyShows {...props} />);
    wrapper.setState({
      undoData: {
        showId: 1,
        showDays: ['Monday']
      }
    });
    const instance = wrapper.instance();
    await instance.undoAction();
    expect(props.followShow.calledOnce).toEqual(true);
    expect(instance.state.undoData).toEqual({
      showId: null, showDays: []
    });
  });
});
