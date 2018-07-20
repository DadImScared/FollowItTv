
import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

class RouteWrapper extends React.Component {
  route = (props) => {
    const { Component, path, routeProps, location, computedMatch, ...other } = this.props;
    return React.cloneElement(<Component />, { ...props, ...other });
  };

  render() {
    const { path, routeProps, location, computedMatch } = this.props;
    return (
      <Route location={location} computedMatch={computedMatch} path={path} {...routeProps} render={this.route} />
    );
  }
}

RouteWrapper.propTypes = {
  path: PropTypes.string.isRequired,
  routeProps: PropTypes.object,
  Component: PropTypes.func.isRequired
};

export default RouteWrapper;
