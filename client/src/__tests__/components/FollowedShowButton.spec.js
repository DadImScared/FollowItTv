
import React from 'react';

import axios from 'axios';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { FollowShowButton } from '../../components/FollowShowButton';


jest.mock('axios');

const followedShows = [1, 2];

const shows = {
  1: {
    id: 1,
    name: 'breaking bad',
    schedule: {
      days: ['monday']
    }
  },
  2: {
    id: 2,
    name: 'under the dome',
    schedule: {
      days: ['tuesday', 'thursday']
    }
  }
};

describe('FollowShowButton', () => {
  let props;
  let wrapper;
  let instance;

  beforeEach(() => {
    props = {
      followShow: sinon.spy(() => {}),
      unfollowShow: sinon.spy(() => {}),
      addShow: sinon.spy(() => {}),
      showId: 1,
      classes: {
        heartIcon: 'heartIcon'
      },
      shows,
      followedShows
    };
    wrapper = shallow(<FollowShowButton {...props} />);
    instance = wrapper.instance();
  });

  it('should render', () => {
    expect(wrapper.find('WithStyles(Button)')).toHaveLength(1);
  });

  test('handleClick', async () => {
    axios.post.mockImplementationOnce(() => ({ data: false }));

    await instance.handleClick();
    expect(props.unfollowShow.calledOnce).toEqual(true);
    expect(props.addShow.called).toEqual(false);
  });

  test('handleClick follow new show', async () => {
    axios.get.mockImplementationOnce(() => ({ data: { id: 3, schedule: { days: ['wednesday'] } } }));
    axios.post.mockImplementationOnce(() => ({ data: true }));
    props.showId = 3;
    wrapper = shallow(<FollowShowButton {...props} />);
    instance = wrapper.instance();
    const spyMethod = sinon.spy(instance, 'getAndUpdateShows');

    await instance.handleClick();
    expect(spyMethod.calledOnce).toEqual(true);
    expect(props.followShow.calledOnce).toEqual(true);
  });
});
