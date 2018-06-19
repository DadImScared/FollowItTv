
import React, { Component } from 'react';

import { connect } from 'react-redux';

import { logInUser } from '../../actions/users';
import withFormState from '../withFormState';
import View from './View';


const message = `
Email is not verified. Please 
`;

export class Login extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      email: '',
      shouldShow: false
    };
  }

  submit = async (e) => {
    e.preventDefault();
    this.props.submit();
    const { handleErrorResponse, form: { email, password }, history, dispatch } = this.props;
    try {
      await dispatch(logInUser({ email, password }));
      history.push('/');
    }
    catch ({ response: { data } }) {
      if (data.non_field_errors && data.non_field_errors[0] === 'E-mail is not verified.') {
        this.setState({ shouldShow: true, email });
      }
      handleErrorResponse(data);
    }
  };

  render() {
    return (
      <View {...this.state} {...this.props} submit={this.submit} message={message} />
    );
  }
}

export default withFormState(connect()(Login));
