
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { requestCrew } from '../../../actions/crew';
import View from './View';

export class Crew extends Component {

  componentDidMount() {
    const { showId, dispatch, crew } = this.props;
    if (crew[showId]) {
      return;
    }
    dispatch(requestCrew(showId));
  }

  render() {
    const { loading, people, crew, showId } = this.props;
    if (loading[`GET_CREW_${showId}`]) {
      return (
        <div>loading here</div>
      );
    }

    if (!crew[showId] || !Object.keys(crew[showId]).length) {
      return (
        <div>no crew members</div>
      );
    }
    return (
      <View people={people} crew={crew} showId={showId} />
    );
  }
}

const mapStateToProps = ({ loading, crew, people }) => ({
  loading,
  crew,
  people
});

export default connect(mapStateToProps)(Crew);
