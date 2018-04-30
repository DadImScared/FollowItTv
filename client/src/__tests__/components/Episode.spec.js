
import React from 'react';

import { createShallow } from 'material-ui/test-utils';

import { Episode } from '../../components/Episode';

const shows = {
  1: {
    name: 'breaking bad',
    id: 1,
    image: {
      medium: 'url here'
    }
  },
  2: {
    name: 'under the dome',
    id: 2,
    image: {
      medium: 'url here'
    }
  }
};

const episodes = {
  1: {
    name: 'episode0',
    id: 1,
    airtime: '08:00',
    summary: 'episode0 summary episode0 summaryepisode0 summaryepisode0 summaryepisode0 summaryepisode0 summaryepisode0 summary',
    show: 1
  },
  2: {
    name: 'episode3',
    id: 2,
    airtime: '02:00',
    summary: null,
    show: 2
  }
};

const classes = {
  media: 'media',
  expand: 'expand',
  expandOpen: 'expandOpen'
};

const props = (num = 1) => ({
  item: episodes[num],
  classes,
  shows
});

describe('Episode', () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it('should render', () => {
    const wrapper = shallow(<Episode {...props()} />);

    expect(wrapper.find('Card')).toHaveLength(1);
  });

  it('should change state on button click', () => {
    const wrapper = shallow(<Episode {...props()} />);

    expect(wrapper.state().isOpen).toEqual(false);
    expect(wrapper.find('.expand')).toHaveLength(1);
    expect(wrapper.find('.expandOpen')).toHaveLength(0);
    wrapper.find('WithStyles(IconButton)').simulate('click');
    expect(wrapper.find('.expandOpen')).toHaveLength(1);
    expect(wrapper.state().isOpen).toEqual(true);
  });

  it('should show read more if summary height is greater or equal to 40', () => {
    const wrapper = shallow(<Episode {...props()} />);

    expect(wrapper.find('#read-more').get(0).props.style.visibility).toEqual('hidden');
    wrapper.setState({ height: 50 });
    expect(wrapper.find('#read-more').get(0).props.style.visibility).toEqual('visible');
  });

  it('should show "No summary entered" if episode has no summary', () => {
    const wrapper = shallow(<Episode {...props(2)} />);

    expect(wrapper.find('WithStyles(Typography)[component="div"]').render().text()).toEqual('No summary entered.');
  });
});

