
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
  let clock;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
    MockComponent = () => (<div>thing here</div>);
    WrapperComponent = withFormState(MockComponent);
    wrapper = shallow(<WrapperComponent />);
  });

  afterEach(() => {
    clock.restore();
  });

  it('should update form state on updateForm', () => {
    const instance = wrapper.instance();

    instance.updateForm(baseData.event, baseData.id);
    expect(instance.state.form.username).toEqual('tom');
  });

  it('should apply validation if validators are passed in', () => {
    const instance = wrapper.instance();

    const nothing = sinon.spy(() => {});
    const badInput = sinon.spy(() => ('bad input'));
    const tooShort = sinon.spy(() => ('too short'));

    const validators = [nothing, badInput, tooShort];

    instance.updateForm(baseData.event, baseData.id, validators);
    clock.tick(1000);
    expect(instance.state.form.username).toEqual('tom');
    expect(instance.state.formErrors.username).toEqual('bad input, too short');
    validators.forEach((validator) => {
      expect(validator.calledOnce).toEqual(true);
    });
  });

  it('should pass down necessary props', () => {
    const propKeys = Object.keys(wrapper.find(MockComponent).props());
    const keys = [
      'clearErrors',
      'clearFields',
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
