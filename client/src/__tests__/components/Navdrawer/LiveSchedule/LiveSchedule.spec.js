
import React from 'react';

import axios from 'axios';
import moment from 'moment';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import { LiveSchedule } from '../../../../components/Navdrawer/LiveSchedule/index';
import { organizeTodayShows, getYesterdayIsAiring } from '../../../../components/Navdrawer/LiveSchedule/stateChanges';

jest.mock('axios');
// jest.mock('moment/now');


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
      addSchedule: sinon.spy(),
      dispatch: sinon.spy()
    };
    wrapper = shallow(<LiveSchedule {...props} />);
    instance = wrapper.instance();
  });

  afterEach(() => {
    // needed if any tests change moment.now
    moment.now = function() {
      return Date.now ? Date.now() : +(new Date());
    };
  });

  it('should set todays date on mount', () => {
    const expectedDate = moment().format('YYYY-MM-DD');
    expect(wrapper.state().today).toEqual(expectedDate);
  });

  // it('should fetchSchedule if no schedule for today', () => {
  //   const spiedMethod = sinon.spy(instance, 'fetchSchedule');
  //   instance.componentDidMount();
  //   expect(spiedMethod.calledOnce).toEqual(true);
  // });

  test('organizeEpisodes method', () => {
    // this test might fail if ran at 12:00am to 12:20am will have to find solution in future
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
    const state = organizeTodayShows({ today }, props);
    // wrapper = shallow(<LiveSchedule {...props} />);
    // const state = wrapper.state();
    expect(state.currentlyAiring.includes(2)).toEqual(true);
    expect(state.willAir.includes(1)).toEqual(true);
    expect(state.hasAired.includes(3)).toEqual(true);
  });

  test('getYesterdayisAiring', () => {
    const today = moment('2016-03-25', 'YYYY-MM-DD');
    const yesterday = today.clone().subtract(1, 'days').format('YYYY-MM-DD');
    moment.now = () => today;
    const episodes = {
      1: {
        id: 1,
        show: 1,
        runtime: 30,
        airtime: '23:53',
        // airtime: moment().add(1, 'minutes').format('HH:mm'),
        airdate: yesterday
      },
      2: {
        id: 2,
        show: 2,
        runtime: 60,
        airtime: '22:00',
        // airtime: moment().subtract(20, 'minutes').format('HH:mm'),
        airdate: yesterday
      },
      3: {
        id: 3,
        show: 3,
        runtime: 10,
        airtime: '23:49',
        // airtime: moment().subtract(15, 'minutes').format('HH:mm'),
        airdate: yesterday
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
        [yesterday]: [1, 2, 3]
      },
      episodes,
      shows
    };
    const state = getYesterdayIsAiring({ currentlyAiring: [] }, props);
    expect(state).toMatchSnapshot();
  });

  test('moveShows', () => {
    const episodes = {
      1: {
        id: 1,
        name: 'breaking bad',
        airtime: moment().add(1, 'minutes').format('HH:mm')
      },
      2: {
        id: 2,
        name: 'under the dome',
        airtime: moment().subtract(20, 'minutes').format('HH:mm')
      },
      3: {
        id: 3,
        name: 'show3',
        airtime: moment().subtract(15, 'minutes').format('HH:mm')
      }
    };
    wrapper = shallow(<LiveSchedule {...props} episodes={episodes} />);
    instance = wrapper.instance();
    instance.setState({ currentlyAiring: [1], hasAired: [2], willAir: [3] });
    instance.moveShow('currentlyAiring', 1);
    expect(instance.state.currentlyAiring).toEqual([]);
    expect(instance.state.hasAired).toEqual([1, 2]);
    instance.moveShow('willAir', 3);
    expect(instance.state.currentlyAiring).toEqual([3]);
  });

  test('multiple moveShow calls at same time', () => {
    const clock = sinon.useFakeTimers();
    const episodes = {
      1: {
        id: 1,
        name: 'breaking bad',
        airtime: moment().add(1, 'minutes').format('HH:mm')
      },
      2: {
        id: 2,
        name: 'under the dome',
        airtime: moment().subtract(20, 'minutes').format('HH:mm')
      },
      3: {
        id: 3,
        name: 'show3',
        airtime: moment().subtract(15, 'minutes').format('HH:mm')
      }
    };
    wrapper = shallow(<LiveSchedule {...props} episodes={episodes} />);
    instance = wrapper.instance();
    instance.setState({ currentlyAiring: [1, 3], hasAired: [2] });
    setTimeout(() => instance.moveShow('currentlyAiring', 1), 1000);
    setTimeout(() => instance.moveShow('currentlyAiring', 3), 1000);
    clock.tick(1000);
    clock.restore();
    expect(instance.state.hasAired).toEqual([1, 3, 2]);
    expect(instance.state.currentlyAiring).toEqual([]);
  });

  test('checkDay', () => {
    const clock = sinon.useFakeTimers();
    wrapper = shallow(<LiveSchedule {...props} />);
    instance = wrapper.instance();
    const oldDay = instance.state.today;
    const tomorrow = moment().add(1, 'days');
    moment.now = () => tomorrow;
    const oldDispatchCount = props.dispatch.callCount;
    instance.checkDay();
    clock.tick(10000);
    expect(props.dispatch.calledOnce !== oldDispatchCount).toEqual(true);
    expect(instance.state.today !== oldDay).toEqual(true);
  });
});
