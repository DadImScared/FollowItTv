
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
        formErrors: {},
        afterSend: {}
      };
    }

    validateDebounce = _.debounce(async (props, { formErrors, form }, id, updateFormErrors, validators) => {
      const errors = await applyValidation(props, { formErrors, form }, id, validators);
      updateFormErrors(errors);
    }, 200);

    updateForm = ({ target: { value } }, id, validators) => {
      const { afterSend } = this.state;
      // clears errors on field if in after send
      // if afterSend[id] === undefined that means the form was
      // submitted with empty fields which include field under 'id' but it still has an error
      // that we need to clear from the server validation
      if (
        this.state.afterSend[id]
        || this.state.afterSend[id] === undefined
        || (typeof afterSend[id] === 'string' && !afterSend[id])
      ) {
        this.clearById(id);
      }
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

    clearById = (id) => {
      const afterSend = { ...this.state.afterSend };
      const formErrors = { ...this.state.formErrors };
      delete formErrors[id];
      afterSend[id] = false;
      this.setState({ afterSend, formErrors });
    };

    afterSend = () => {
      this.setState({ afterSend: Object.keys(this.state.form).length ? this.state.form:{} });
    };

    clear = () => {
      this.setState({ form: {}, formErrors: {} });
    };

    render() {
      const { afterSend, ...passedState } = this.state;
      return (
        <WrapperComponent
          updateForm={this.updateForm}
          updateFormErrors={this.updateFormErrors}
          handleErrorResponse={this.handleErrorResponse}
          clearErrors={this.clearErrors}
          clearFields={this.clearFields}
          clear={this.clear}
          submit={this.afterSend}
          {...passedState}
          {...this.props}
        />
      );
    }
  }
  WithFormState.displayName = `WithFormState(${getDisplayName(WrapperComponent)})`;
  return WithFormState;
}
