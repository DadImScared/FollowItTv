
import React from 'react';

import axios from 'axios';
import sinon from 'sinon';
import { createShallow } from 'material-ui/test-utils';

import { Schedule } from '../../../components/Schedule/index';


jest.mock('axios');

const props = {
  schedule: {},
  addShows: sinon.spy(),
  addSchedule: sinon.spy(),
  match: { params: { date: '2018-03-20' } }
};

describe('Schedule', () => {
  let shallow;
  beforeAll(() => {
    shallow = createShallow();
  });

  it('should render', () => {
    sinon.spy(Schedule.prototype, 'componentDidMount');
    sinon.spy(Schedule.prototype, 'componentWillReceiveProps');
    const response = {
      data: [{ name: 'episode0', show: { id: 1, name: 'ewawd' } }]
    };
    axios.get.mockImplementation(() => response);
    const wrapper = shallow(<Schedule {...props}  />);
    setImmediate(() => {
      expect(props.addShows.calledOnce).toEqual(true);
      expect(props.addSchedule.calledOnce).toEqual(true);
      expect(wrapper.find('View')).toHaveLength(1);
    });
  });
});
