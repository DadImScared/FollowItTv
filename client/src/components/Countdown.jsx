
import React, { Component } from 'react';

import moment from 'moment';

import Typography from 'material-ui/Typography';


export class Countdown extends Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  componentDidMount() {
    const { eventTime, startTime = moment(), callBack } = this.props;
    const diff = eventTime.diff(startTime);
    const duration = moment.duration(diff);
    if (duration.asMilliseconds() <= 0) {
      callBack && callBack();
      return;
    }
    this.setState({ duration });
    this.interval = setInterval(() => {
      this.updateTimer();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateTimer = () => {
    const newDuration = this.state.duration.clone();
    newDuration.subtract(1, 'seconds');
    if (newDuration.asMilliseconds() <= 0) {
      const { callBack } = this.props;
      clearInterval(this.interval);
      callBack && callBack();
      return;
    }
    this.setState({ duration: newDuration });
  };

  getCountdown = () => {
    const { duration } = this.state;
    const days = duration.days();
    const hours = this.format(duration.hours());
    const minutes = this.format(duration.minutes());
    const seconds = this.format(duration.seconds());
    // don't show days if days are 0
    return `in ${days !== 0 ? `${days} days and `:''}${hours}:${minutes}:${seconds}`;
  };

  format = (time) => {
    const timeStr = time.toString();
    return timeStr.length === 1 ? (
      `0${timeStr}`
    ):(
      timeStr
    );
  };

  render() {
    return (
      <Typography>
        {
          this.state.duration ?
            this.getCountdown()
            :
            '00:00:'
        }
      </Typography>
    );
  }
}

export default Countdown;
