
import React, { Component } from 'react';

import _ from 'lodash';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';

import { requestSchedule } from '../../../actions/schedule';
import { organizeTodayShows, getYesterdayIsAiring } from './stateChanges';

import View from './View';

const nextStep = {
  'willAir': 'currentlyAiring',
  'currentlyAiring': 'hasAired'
};

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
    const { dispatch, schedule } = this.props;
    const today = this.today();
    this.setState({ today, todayObj: moment() }, () => {
      // this will not bring up shows on mobile because the navdrawer un mounts when it's closed
      // solution check data and if it exists organize shows today and yesterday
      if (schedule[today]) {
        const { willAir, currentlyAiring, hasAired } = organizeTodayShows(this.state, this.props);
        const { currentlyAiring: yesterdayAiring } = getYesterdayIsAiring(this.state, this.props);
        this.setState({ currentlyAiring: [...currentlyAiring, ...yesterdayAiring], willAir, hasAired });
      }
      dispatch(requestSchedule(today));
      dispatch(requestSchedule(this.state.todayObj.clone().subtract(1, 'days').format('YYYY-MM-DD')));
      this.checkDay();
    });
  }

  componentWillReceiveProps(nextProps) {
    const { schedule: oldSchedule } = this.props;
    const { today, todayObj } = this.state;
    const { schedule } = nextProps;
    const yesterdayObj = todayObj.clone().subtract(1, 'days');
    const yesterday = yesterdayObj.format('YYYY-MM-DD');
    const todayOldSchedule = _.get(oldSchedule, today, []);
    const yesterdayOldSchedule = _.get(oldSchedule, yesterday, []);
    const todaySchedule = _.get(schedule, today, []);
    const yesterdaySchedule = _.get(schedule, yesterday, []);
    if (!this.compareArray(todayOldSchedule, todaySchedule)) {
      this.setState(organizeTodayShows);
    }
    if (!this.compareArray(yesterdayOldSchedule, yesterdaySchedule)) {
      this.setState(getYesterdayIsAiring);
    }
  }

  checkDay = () => {
    const { dispatch } = this.props;
    setInterval(() => {
      const now = moment();
      const nowFormat = moment().format('YYYY-MM-DD');
      if (this.state.today !== nowFormat) {
        // new day
        this.setState({
          today: nowFormat,
          todayObj: now
        }, () => dispatch(requestSchedule(nowFormat)));
      }
    }, 10000);
  };

  moveShow = (currentStep, id) => {
    this.setState((prevState, { episodes }) => {
      const currentStepList = prevState[currentStep].filter((item) => item !== id);
      const nextStepList = [...prevState[nextStep[currentStep]], id];
      const sortedList = _.orderBy(nextStepList, [(o) => moment(episodes[o].airtime, 'HH:mm')], ['desc']);
      return {
        [currentStep]: currentStepList,
        [nextStep[currentStep]]: sortedList
      };
    });
  };

  compareArray = (arr1, arr2) => {
    return _.isEqual([...arr1].sort(), [...arr2].sort());
  };


  today = () => {
    return moment().format('YYYY-MM-DD');
  };

  render() {
    const { episodes, shows } = this.props;
    return (
      <View {...this.state} episodes={episodes} shows={shows} moveShow={this.moveShow} />
    );
  }
}

LiveSchedule.propTypes = {
  schedule: PropTypes.object.isRequired,
  shows: PropTypes.object.isRequired,
  episodes: PropTypes.object.isRequired
};

const mapStateToProps = ({ shows, schedule, episodes }) => ({
  schedule,
  shows,
  episodes
});


export default connect(mapStateToProps)(LiveSchedule);
