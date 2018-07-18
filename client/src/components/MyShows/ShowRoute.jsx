
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import ShowList from './ShowList';

class ShowRoute extends Component {
  route = () => {
    const { day, unFollow } = this.props;
    return (<ShowList day={day} unFollow={unFollow} />);
  };

  render() {
    const { day = 'All', match } = this.props;
    return (
      <Route
        exact
        path={
          day === 'All' ?
            `(${match.url}|${match.url}/All)`
            :
            `${match.url}/${day}`
        }
        render={this.route}
      />
    );
  }
}

ShowRoute.propTypes = {
  day: PropTypes.string.isRequired,
  unFollow: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

export default ShowRoute;
