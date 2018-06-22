
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { requestCast } from '../../../actions/characters';
import View from './View';

export class Cast extends Component {

  componentDidMount() {
    const { show, showId, dispatch } = this.props;
    if (_.get(show, 'cast', false)) {
      return;
    }
    dispatch(requestCast(showId));
  }

  render() {
    const { show, showId, loading, characters, people } = this.props;
    if (loading[`GET_CAST_${showId}`]) {
      return (
        <div>loading</div>
      );
    }

    if (!show.cast) {
      return (
        <div>no cast</div>
      );
    }

    return (
      <View show={show} characters={characters} people={people} />
    );
  }
}

const mapStateToProps = ({ loading, characters, people }) => ({
  loading,
  characters,
  people
});

export default connect(mapStateToProps)(Cast);
