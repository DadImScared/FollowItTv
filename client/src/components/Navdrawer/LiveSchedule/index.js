
import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';

import { addShows } from '../../../actions/shows';
import { getSchedule, getEpisodesAndShows, addSchedule } from '../../../actions/schedule';
import { addEpisodes } from '../../../actions/episodes';

import View from './View';


export class LiveSchedule extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      today: '',
      currentlyAiring: [],
      hasAired: [],
      willAir: [],
      errorMessage: ''
    };
  }

  componentDidMount() {
    const { schedule } = this.props;
    const today = this.today();
    this.setState({ today }, async () => {
      if (!schedule[today]) {
        await this.fetchSchedule();
      }
      try {
        this.organizeShows();
      }
      catch (e) {
        console.log(e);
        // for some reasons shows didn't load
        // maybe timeout from api so prompt for refresh
        this.setState({ errorMessage: 'there has been an error loading shows please refresh and try again' });
      }
    });
  }

  organizeShows = () => {
    // organize shows into one of category
    // "willAir" "currentlyAiring" "hasAired"
    const willAir = [];
    const currentlyAiring = [];
    const hasAired = [];
    const { schedule , episodes } = this.props;
    const { today } = this.state;
    const now = moment();
    schedule[today].forEach((episodeId) => {
      const { airtime: time, airdate: date, runtime, show: id } = episodes[episodeId];
      const showDate = moment(`${date} ${time}`, 'YYYY-MM-DD HH:mm');
      if (now.diff(showDate) < 0) {
        this.pushArray(willAir, id);
      }
      else if (now.diff(showDate.clone().add(runtime, 'minutes')) > 0 ) {
        this.pushArray(hasAired, id);
      }
      else {
        this.pushArray(currentlyAiring, id);
      }
    });
    this.setState({ willAir, currentlyAiring, hasAired });
  };

  pushArray = (arr, id) => {
    if (!arr.includes(id)) {
      arr.push(id);
    }
  };

  fetchSchedule = async () => {
    const { addShows, addEpisodes, addSchedule } = this.props;
    const { today } = this.state;
    try {
      const { data } = await getSchedule(today);
      const { episodes, shows, episodeIds } = getEpisodesAndShows(data);
      addShows(shows);
      addEpisodes(episodes);
      addSchedule(today, episodeIds);
    }
    catch (e) {
      console.log(e);
    }
  };

  today = () => {
    return moment().format('YYYY-MM-DD');
  };

  render() {
    return (
      <View {...this.state} shows={this.props.shows} />
    );
  }
}

LiveSchedule.propTypes = {
  schedule: PropTypes.object.isRequired,
  shows: PropTypes.object.isRequired,
  episodes: PropTypes.object.isRequired,
  addShows: PropTypes.func.isRequired,
  addEpisodes: PropTypes.func.isRequired,
  addSchedule: PropTypes.func.isRequired
};

const mapStateToProps = ({ shows, schedule, episodes }) => ({
  schedule,
  shows,
  episodes
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addShows,
    addEpisodes,
    addSchedule
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LiveSchedule);