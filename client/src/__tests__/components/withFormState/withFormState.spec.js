
import React from 'react';

import { shallow } from 'enzyme';
import sinon from 'sinon';

import withFormState from '../../../components/withFormState';


const baseData = {
  id: 'username',
  event: {
    target: {
      value: 'tom'
    }
  }
};


describe('withFormState HOC', () => {
  let MockComponent;
  let WrapperComponent;
  let wrapper;

  beforeEach(() => {
    MockComponent = () => (<div>thing here</div>);
    WrapperComponent = withFormState(MockComponent);
    wrapper = shallow(<WrapperComponent />);
  });

  it('should update form state on updateForm', () => {
    const instance = wrapper.instance();

    instance.updateForm(baseData.event, baseData.id);
    expect(instance.state.form.username).toEqual('tom');
  });

  it('should call validateDebounce on updateForm if validators exist', async () => {
    const instance = wrapper.instance();
    const spy = sinon.spy(instance, 'validateDebounce');
    const nothing = () => {};
    const badInput = () => ('bad input');
    const tooShort = () => ('too short');

    const validators = [nothing, badInput, tooShort];

    instance.updateForm(baseData.event, baseData.id, validators);

    expect(spy.calledOnce).toEqual(true);
  });

  it('should pass down necessary props', () => {
    const propKeys = Object.keys(wrapper.find(MockComponent).props());
    const keys = [
      'clearErrors',
      'clearFields',
      'clear',
      'form',
      'formErrors',
      'handleErrorResponse',
      'updateForm',
      'updateFormErrors'
    ];
    propKeys.forEach((key) => {
      expect(keys.includes(key)).toEqual(true);
    });
  });
});
