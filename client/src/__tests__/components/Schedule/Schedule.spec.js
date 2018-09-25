
import React from 'react';

import axios from 'axios';
import moment from 'moment';
import sinon from 'sinon';
import { createShallow } from '@material-ui/core/test-utils';

import { Schedule } from '../../../components/Schedule/index';

jest.mock('axios');

describe('Schedule', () => {
  let shallow;
  let props;
  const date = '2018-03-20';
  beforeAll(() => {
    shallow = createShallow();
    props = {
      schedule: {},
      loading: {},
      dispatch: jest.fn(),
      addShows: sinon.spy(() => {}),
      addSchedule: sinon.spy(() => {}),
      addEpisodes: sinon.spy(() => {}),
      match: { params: { date } }
    };
  });

  it('should render', () => {
    const response = {
      data: [{ id: 1, name: 'episode0', show: { id: 1, name: 'ewawd' } }]
    };
    axios.get.mockImplementation(() => response);
    const wrapper = shallow(<Schedule {...props} />);
    expect(props.dispatch).toHaveBeenCalledTimes(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('should update selectedDate to params date on mount', () => {
    const newProps = { ...props, schedule: { [date]: [] } };
    const wrapper = shallow(<Schedule {...newProps} />);
    expect(wrapper.state().selectedDate).toEqual(moment(date).toDate());
  });
});
