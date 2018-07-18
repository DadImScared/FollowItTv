
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';

import Button from '@material-ui/core/Button';

import ShowListItem from '../../../components/MyShows/ShowListItem';

describe('ShowListItem', () => {
  let props;

  beforeEach(() => {
    props = {
      show: {
        id: 1,
        name: 'breaking bad'
      },
      unFollow: sinon.spy()
    };
  });

  it('should render', () => {
    const wrapper = shallow(<ShowListItem {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should call unFollow on button click', () => {
    const wrapper = shallow(<ShowListItem {...props} />);
    wrapper.find(Button).simulate('click');
    expect(props.unFollow.calledOnce).toEqual(true);
  });
});
