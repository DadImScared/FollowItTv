
import React, { Component } from 'react';

import _ from 'lodash';

import { applyValidation } from './utility';

function getDisplayName(WrapperComponent) {
  return WrapperComponent.displayName || WrapperComponent.name || 'Component';
}

export default function(WrapperComponent) {
  class WithFormState extends Component {
    constructor(...args) {
      super(...args);
      this.state = {
        form: {},
        formErrors: {}
      };
    }

    validateDebounce = _.debounce(async (props, { formErrors, form }, id, updateFormErrors, validators) => {
      const errors = { ...formErrors };
      errors[id] = await applyValidation(props, { formErrors, form }, id, validators);
      updateFormErrors(errors);
    }, 200);

    updateForm = ({ target: { value } }, id, validators) => {
      const newForm = { ...this.state.form };
      newForm[id] = value;
      this.setState({ form: newForm }, () => {
        if (validators && validators.length) {
          this.validateDebounce(this.props, this.state, id, this.updateFormErrors, validators);
        }
      });
    };

    clearFields = () => {
      this.setState({ form: {} });
    };

    updateFormErrors = (newErrors) => this.setState({ formErrors: newErrors });

    handleErrorResponse = (data) => {
      const newErrors = {};
      Object.keys(data).forEach((key) => {
        if (key === 'non_field_errors') {
          newErrors['nonFieldErrors'] = data[key].join(', ');
        }
        else {
          if (key === 'detail') {
            newErrors['nonFieldErrors'] = data[key];
          }
          else {
            newErrors[key] = typeof data[key] === 'string' ? data[key]:data[key].join(', ');
          }
        }
      });
      this.updateFormErrors(newErrors);
    };

    clearErrors = () => {
      this.setState({ formErrors: {} });
    };

    clear = () => {
      this.setState({ form: {}, formErrors: {} });
    };

    render() {
      return (
        <WrapperComponent
          updateForm={this.updateForm}
          updateFormErrors={this.updateFormErrors}
          handleErrorResponse={this.handleErrorResponse}
          clearErrors={this.clearErrors}
          clearFields={this.clearFields}
          clear={this.clear}
          {...this.state}
          {...this.props}
        />
      );
    }
  }
  WithFormState.displayName = `WithFormState(${getDisplayName(WrapperComponent)})`;
  return WithFormState;
}
