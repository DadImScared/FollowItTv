
import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

import { getSchedule, getEpisodesAndShows, addSchedule } from '../../actions/schedule';
import { addShows } from '../../actions/shows';
import { addEpisodes } from '../../actions/episodes';

import View from './View';

export class Schedule extends Component {

  componentDidMount() {
    const date = this.getDate(this.props);
    const { schedule } = this.props;
    if (schedule[date]) {
      return;
    }
    this.fetchSchedule(date);
  }

  componentWillReceiveProps(nextProps) {
    const oldDate = this.getDate(this.props);
    const newDate = this.getDate(nextProps);
    const { schedule } = nextProps;
    if (oldDate !== newDate) {
      if (schedule[newDate]) {
        return;
      }
      this.fetchSchedule(newDate);
    }
  }

  getDate = (props) => {
    const { match: { params: { date = moment().format('YYYY-MM-DD') } } } = props;
    return date;
  };

  fetchSchedule = async (date) => {
    const {
      addSchedule,
      addShows,
      addEpisodes
    } = this.props;
    try {
      const { data } = await getSchedule(date);
      const { episodes, shows, episodeIds } = getEpisodesAndShows(data);
      addShows(shows);
      addEpisodes(episodes);
      addSchedule(date, episodeIds);
    }
    catch ({ response: { data } }) {
      console.log(data);
    }
  };

  render() {
    const { schedule } = this.props;
    console.log(schedule[this.getDate(this.props)] || [] );
    return (
      <View episodeIds={schedule[this.getDate(this.props)] || []} {...this.props} />
    );
  }
}

const mapStateToProps = ({ schedule, shows, episodes }) => ({
  schedule,
  shows,
  episodes
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addShows,
    addSchedule,
    addEpisodes
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
