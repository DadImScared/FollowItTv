
import React from 'react';

import { shallow } from 'enzyme';

import View from '../../../components/Schedule/View';

const episodes = {
  1: {},
  2: {},
  3: {}
};

describe('View', () => {

  it('should render', () => {
    const wrapper = shallow(<View classes={{ content: '' }} episodes={episodes} episodeIds={[1, 2, 3]} />);

    expect(wrapper.find('WithStyles(GridWrapper)')).toHaveLength(4);
  });
});
