
import React from 'react';

import { shallow } from 'enzyme';

import View from '../../../components/Schedule/View';

const episodes = [
  {}, {}, {}
];

describe('View', () => {

  it('should render', () => {
    const wrapper = shallow(<View classes={{ content: '' }} episodes={episodes} />);
    expect(wrapper.find('div')).toHaveLength(4);
  });
});
