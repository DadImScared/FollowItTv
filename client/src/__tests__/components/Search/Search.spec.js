
import React from 'react';

import axios from 'axios';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { Search } from '../../../components/Search/index';


jest.mock('axios');

const response = {
  data: []
};

describe('Search', () => {
  let props;
  let setStateSpy;
  beforeEach(() => {
    setStateSpy = sinon.spy(Search.prototype, 'setState');
    props = {
      search: {},
      shows: {},
      dispatch: () => {},
      match: {
        params: {
          query: 'breaking bad'
        }
      },
      location: {
        pathname: '/search/breaking bad'
      }
    };
  });

  afterEach(() => {
    setStateSpy.restore();
  });
  
  test('getShows is called on mount', async () => {
    axios.get.mockImplementation(() => response);
    const wrapper = shallow(<Search {...props} />);
    const instance = wrapper.instance();
    await instance.getShows(props);
    expect(setStateSpy.callCount).toEqual(4);
  });

  test('getShows returns existing data instead of api call', () => {
    axios.get.mockImplementationOnce(() => response);
    props.search['breaking bad'] = [];
    shallow(<Search {...props} />);
    expect(setStateSpy.callCount).toEqual(0);
  });

  test('getShows sets error message on error', async () => {
    const message = 'Please try again in a minute';
    const errorResponse = {
      response: {
        status: 429,
        data: {
          message
        }
      }
    };
    axios.get.mockImplementation(() => {
      throw errorResponse;
    });
    const wrapper = shallow(<Search {...props} />);
    const instance = wrapper.instance();
    await instance.getShows(props);
    expect(instance.state.errorMessage).toEqual(message);
  });
});
