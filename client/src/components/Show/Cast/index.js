
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { requestCast } from '../../../actions/characters';
import View from './View';

export class Cast extends Component {

  componentDidMount() {
    const { showId, showCharacters, dispatch } = this.props;
    if (showCharacters[showId]) {
      return;
    }
    dispatch(requestCast(showId));
  }

  render() {
    const { showId, loading, characters, people, showCharacters } = this.props;
    if (loading[`GET_CAST_${showId}`]) {
      return (
        <div>loading</div>
      );
    }

    if (!showCharacters[showId]) {
      return (
        <div>no cast</div>
      );
    }

    return (
      <View characterIds={showCharacters[showId]} characters={characters} people={people} />
    );
  }
}

const mapStateToProps = ({ loading, characters, people, showCharacters }) => ({
  loading,
  characters,
  people,
  showCharacters
});

export default connect(mapStateToProps)(Cast);
