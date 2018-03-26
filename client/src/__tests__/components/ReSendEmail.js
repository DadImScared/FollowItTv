
import React from 'react';

import axios from 'axios';
import { shallow } from 'enzyme';

import { ReSendEmail } from '../../components/ReSendEmail';

jest.mock('axios');

const props = {
  message: 'message here',
  email: 'email@mail.com',
  classes: {
    wrapper: 'wrapper'
  }
};

describe('ReSendEmail', () => {
  it('should re send email on click', () => {
    const wrapper = shallow(<ReSendEmail {...props} />);

    axios.post.mockImplementation(() => ({ data: '' }));
    expect(wrapper.state().afterSend).toEqual(false);
    wrapper.find('#send-more').simulate('click');
    setImmediate(() => {
      expect(wrapper.instance().state.afterSend).toEqual(true);
    });
  });
});
