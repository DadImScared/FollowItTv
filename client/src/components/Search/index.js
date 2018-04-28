
import React, { Component } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { searchShows } from '../../actions/search';
import View from './View';


export class Search extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      isLoading: false,
      errorMessage: ''
    };
  }

  async componentDidMount() {
    await this.getShows(this.props);
  }

  async componentWillReceiveProps(nextProps) {
    const { location: { pathname: oldPath } } = this.props;
    const { location: { pathname } } = nextProps;
    if (oldPath !== pathname) {
      await this.getShows(nextProps);
    }
  }

  getShows = async (props) => {
    const { dispatch, search, match: { params: { query } } } = props;
    if (search[query]) {
      return;
    }
    const newState = {};
    this.setState({ isLoading: true });
    try {
      await searchShows(dispatch, query);
    }
    catch ({ response: { status, data: { message } } }) {
      if (status === 429) {
        newState.errorMessage = 'Please try again in a minute';
      }
      else {
        newState.errorMessage = message;
      }
    }
    this.setState({ isLoading: false, ...newState });
  };

  render() {
    const { match: { params: { query } }, search, ...other } = this.props;
    return (
      <View results={search[query] || []} {...other} {...this.state} />
    );
  }
}

Search.propTypes = {
  search: PropTypes.object.isRequired,
  shows: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      query: PropTypes.string.isRequired
    })
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

const mapStateToProps = ({ search, shows }) => ({
  search,
  shows
});

export default connect(mapStateToProps)(Search);
