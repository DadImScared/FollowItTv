
import React from 'react';

import { shallow } from 'enzyme';

import { ExpandedShows } from '../../../../components/Navdrawer/LiveSchedule/ExpandedShows';


describe('ExpandedShows', () => {
  let wrapper;
  let props;
  const panels = [[[1], 'Airing soon'], [[2], 'Already aired']];
  beforeEach(() => {
    props = {
      shows: {
        1: {
          name: 'show1'
        },
        2: {
          name: 'show2'
        }
      },
      panels
    };

  });
  it('should mount with correct panel open', () => {
    wrapper = shallow(<ExpandedShows {...props} />);
    expect(wrapper.state().expanded).toEqual(0);
  });

  it('should default second panel if first has no items', () => {
    props.panels = [[[], 'Airing soon'], panels[1]];
    wrapper = shallow(<ExpandedShows {...props} /> );
    expect(wrapper.state().expanded).toEqual(1);
  });
});
