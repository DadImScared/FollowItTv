
import React, { Component } from 'react';

import { registerUser } from '../../actions/users';
import withFormState from '../withFormState';
import View from './View';

const message = 'Thank you for registering please ';

export class Register extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      shouldShow: false,
      email: ''
    };
  }

  submit = async (e) => {
    e.preventDefault();
    this.props.submit();
    const { form: { email, ...other }, handleErrorResponse, clear } = this.props;
    try {
      await registerUser({ email, ...other });
      this.setState({ shouldShow: true, email });
      clear();
    }
    catch ({ response: { data } }) {
      handleErrorResponse(data);
    }
  };

  render() {
    return (
      <View {...this.state} message={message} {...this.props } submit={this.submit} />
    );
  }
}

export default withFormState(Register);
