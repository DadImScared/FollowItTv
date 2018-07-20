
import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import RouteWrapper from '../../components/RouteWrapper';

const componentOne = (props) => (<div>{props.text}</div>);

describe('RouteWrapper', () => {
  it('should render', () => {
    const text = 'test text 123';
    const wrapper = mount(
      <MemoryRouter initialEntries={['/login']}>
        <RouteWrapper text={text} path={'/login'} Component={componentOne}/>
      </MemoryRouter>
    );
    expect(wrapper.find(componentOne)).toHaveLength(1);
    const props = wrapper.find(componentOne).props();
    expect(props.text).toEqual(text);
    expect(props.match).toBeTruthy();
    expect(props.location).toBeTruthy();
    expect(props.history).toBeTruthy();
  });

  it('should not render', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/schedule']}>
        <RouteWrapper text={'text here'} path={'/login'} Component={componentOne}/>
      </MemoryRouter>
    );
    expect(wrapper.find(componentOne)).toHaveLength(0);
  });
});
