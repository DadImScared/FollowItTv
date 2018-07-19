
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { logOutUser } from '../actions/users';

class Logout extends Component {
  componentDidMount() {
    this.props.logOut();
  }

  render() {
    return <Redirect to='/login' />;
  }
}

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(logOutUser())
});

export default connect(null, mapDispatchToProps)(Logout);
