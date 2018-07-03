
import React, { Component } from 'react';

import { connect } from 'react-redux';
import moment from 'moment';

import { requestSchedule } from '../../actions/schedule';

import View from './View';

export class Schedule extends Component {
  componentDidMount() {
    const date = this.getDate(this.props);
    this.props.dispatch(requestSchedule(date));
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const oldDate = this.getDate(this.props);
    const newDate = this.getDate(nextProps);
    if (oldDate !== newDate) {
      this.props.dispatch(requestSchedule(newDate));
    }
  }

  setMasonryRef = (el) => {
    this.masonry = this.masonry || el.masonry;
  };

  getDate = (props) => {
    const { match: { params: { date = moment().format('YYYY-MM-DD') } } } = props;
    return date;
  };

  expandContentCb = () => {
    setTimeout(() => this.masonry.layout(), 275); // wait for close/open transition to finish before setting layout
  };

  render() {
    const { schedule, loading, ...other } = this.props;
    const date = this.getDate(other);
    const loadingId = `GET_SCHEDULE_${date}`;
    if (loading[loadingId]) {
      return (
        <div>loading</div>
      );
    }
    if (!schedule[date] || schedule[date] && !schedule[date].length) {
      return (
        <div>no results</div>
      );
    }
    return (
      <View
        expandContentCb={this.expandContentCb}
        setMasonryRef={this.setMasonryRef}
        episodeIds={schedule[date] || []}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({ schedule, shows, episodes, loading }) => ({
  schedule,
  shows,
  episodes,
  loading
});

export default connect(mapStateToProps)(Schedule);
