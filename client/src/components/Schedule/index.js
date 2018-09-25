
import React, { Component } from 'react';

import { connect } from 'react-redux';
import moment from 'moment';

import { requestSchedule } from '../../actions/schedule';
import View from './View';

export class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date()
    };
  }

  componentDidMount() {
    const date = this.getDate(this.props);
    this.props.dispatch(requestSchedule(date));
    this.dateStringToSelectedDate(date);
  }

  componentDidUpdate(prevProps) {
    const oldDate = this.getDate(prevProps);
    const newDate = this.getDate(this.props);
    if (oldDate !== newDate) {
      this.props.dispatch(requestSchedule(newDate));
      this.dateStringToSelectedDate(newDate);
    }
  }

  dateStringToSelectedDate = (date) => {
    this.setState({ selectedDate: moment(date).toDate() });
  };

  handleDateChange = (date) => {
    this.setState({ selectedDate: date.toDate() });
    this.props.history.push(`/schedule/${date.format('YYYY-MM-DD')}`);
  };

  setMasonryRef = (el) => {
    if (el) {
      this.masonry = el.masonry;
    }
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
        handleDateChange={this.handleDateChange}
        {...this.state}
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
