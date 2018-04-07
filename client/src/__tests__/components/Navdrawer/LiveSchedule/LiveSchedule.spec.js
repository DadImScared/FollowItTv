
import React from 'react';

import axios from 'axios';
import moment from 'moment';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import { LiveSchedule } from '../../../../components/Navdrawer/LiveSchedule/index';

jest.mock('axios');


const data = [];


describe('LiveSchedule', () => {
  let wrapper;
  let instance;
  let props;

  beforeEach(() => {
    axios.get.mockImplementation(() => ({ data }));
    props = {
      schedule: {},
      shows: {},
      episodes: {},
      addShows: sinon.spy(),
      addEpisodes: sinon.spy(),
      addSchedule: sinon.spy()
    };
    wrapper = shallow(<LiveSchedule {...props} />);
    instance = wrapper.instance();
  });

  it('should set todays date on mount', () => {
    const expectedDate = moment().format('YYYY-MM-DD');
    expect(wrapper.state().today).toEqual(expectedDate);
  });

  it('should fetchSchedule if no schedule for today', () => {
    const spiedMethod = sinon.spy(instance, 'fetchSchedule');
    instance.componentDidMount();
    expect(spiedMethod.calledOnce).toEqual(true);
  });

  test('organizeShows method', () => {
    // this test might fail if ran at 12:00am to 12:10am will have to find solution in future
    // a normal schedule will not fail regardless of time
    const today = moment().format('YYYY-MM-DD');
    const episodes = {
      1: {
        id: 1,
        show: 1,
        runtime: 30,
        airtime: moment().add(1, 'minutes').format('HH:mm'),
        airdate: today
      },
      2: {
        id: 2,
        show: 2,
        runtime: 60,
        airtime: moment().subtract(20, 'minutes').format('HH:mm'),
        airdate: today
      },
      3: {
        id: 3,
        show: 3,
        runtime: 10,
        airtime: moment().subtract(15, 'minutes').format('HH:mm'),
        airdate: today
      }
    };
    const shows = {
      1: {
        id: 1,
        name: 'breaking bad',
        schedule: {
          time: moment().add(1, 'minutes').format('HH:mm')
        },
        runtime: 30
      },
      2: {
        id: 2,
        name: 'under the dome',
        schedule: {
          time: moment().subtract(20, 'minutes').format('HH:mm')
        },
        runtime: 60
      },
      3: {
        id: 3,
        name: 'show3',
        schedule: {
          time: moment().subtract(15, 'minutes').format('HH:mm')
        },
        runtime: 10
      }
    };
    props = {
      ...props,
      schedule: {
        [today]: [1, 2, 3]
      },
      episodes,
      shows
    };
    wrapper = shallow(<LiveSchedule {...props} />);
    const state = wrapper.state();
    expect(state.currentlyAiring.includes(2)).toEqual(true);
    expect(state.willAir.includes(1)).toEqual(true);
    expect(state.hasAired.includes(3)).toEqual(true);
  });
});
