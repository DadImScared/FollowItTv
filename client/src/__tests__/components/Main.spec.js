
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { createShallow } from 'material-ui/test-utils';

import { Main } from '../../components/Main';



describe('Main', () => {
  const classes = { content: 'content' };
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it('renders', () => {
    const wrapper = shallow(<Main classes={classes} />);
    expect(
      wrapper.find(Switch)
    ).toHaveLength(1);
    expect(
      wrapper.find(Route)
    ).toHaveLength(3);
  });
});
