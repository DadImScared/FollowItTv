
import React from 'react';

import { shallow } from 'enzyme';

import { Season } from '../../../../components/Show/Seasons/Season';

describe('Season', () => {
  it('should render', () => {
    const props = {
      addEpisodes: jest.fn(),
      season: {
        id: 1,
        episodeOrder: 13
      },
      show: {},
      episodes: [{ id: 1 }],
      hasData: true,
      isLoading: false
    };
    const wrapper = shallow(<Season {...props} />);
    expect(props.addEpisodes).toHaveBeenCalledTimes(0);
    expect(wrapper).toMatchSnapshot();
  });
});
