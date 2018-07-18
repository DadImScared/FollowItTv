
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Field extends Component {

  updateField = (e) => {
    const { updateForm, id, validators } = this.props;
    updateForm(e, id, validators);
  };

  render() {
    return React.cloneElement(this.props.children, { onChange: this.updateField });
  }
}

Field.propTypes = {
  id: PropTypes.string.isRequired,
  validators: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  updateForm: PropTypes.func.isRequired
};
