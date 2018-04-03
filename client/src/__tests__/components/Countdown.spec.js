
import React from 'react';

import moment from 'moment';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { Countdown } from '../../components/Countdown';


describe('Countdown' ,() => {
  let clock;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  it('should call updateTimer method every 1 second', () => {
    const props = {
      eventTime: moment('2018-06-13 11:59', 'YYYY-MM-DD HH:mm'),
      startTime: moment('2018-06-13 11:00', 'YYYY-MM-DD HH:mm')
    };

    const wrapper = shallow(<Countdown {...props} />);
    const instance = wrapper.instance();
    const spied = sinon.spy(instance, 'updateTimer');
    clock.tick(3000);

    expect(spied.calledThrice).toEqual(true);

    const diff = props.eventTime.diff(props.startTime);
    const expectedDuration = moment.duration(diff);

    expectedDuration.subtract(3, 'seconds');
    expect(instance.state.duration.asMilliseconds()).toEqual(expectedDuration.asMilliseconds());
    expect(instance.state.duration.minutes()).toEqual(58);
  });

  it('should call callBack once duration is <= 0', () => {
    const props = {
      eventTime: moment('2018-06-13 11:59:20', 'YYYY-MM-DD hh:mm:s'),
      startTime: moment('2018-06-13 11:59:18', 'YYYY-MM-DD hh:mm:s'),
      callBack: sinon.spy()
    };
    shallow(<Countdown {...props} />);
    clock.tick(1000);
    expect(props.callBack.calledOnce).toEqual(false);
    clock.tick(1000);
    expect(props.callBack.calledOnce).toEqual(true);
  });

  it('should render single digit time with a 0 before it', () => {
    const props = {
      eventTime: moment('2018-06-13 11:09', 'YYYY-MM-DD HH:mm'),
      startTime: moment('2018-06-13 11:00', 'YYYY-MM-DD HH:mm')
    };

    const wrapper = shallow(<Countdown {...props} />);
    expect(wrapper.render().text()).toEqual('in 00:09:00');
  });
});
