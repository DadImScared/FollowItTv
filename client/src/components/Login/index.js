
import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';

import { postLogIn, logIn } from '../../actions/users';
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
    const { handleErrorResponse, form: { email, password }, history } = this.props;
    try {
      const { data: { key } } = await postLogIn({ email, password });
      this.props.logIn(key);
      history.push('/');
      Cookies.set('token', key);
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    logIn: logIn
  }, dispatch);
};

export default withFormState(connect(null, mapDispatchToProps)(Login));
