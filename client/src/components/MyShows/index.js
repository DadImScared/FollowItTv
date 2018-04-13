
import React, { Component } from 'react';

import { connect } from 'react-redux';

import { getFollowedShows } from '../../actions/followedShows';
import View from './View';


const routes = {
  0: 'All',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
  7: 'Sunday'
};

export class MyShows extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      day: 0
    };
  }

  componentDidMount() {
    this.setInitialTab(this.props, async () => {
      if (this.scheduleExists()) {
        return;
      }
      await this.fetchSchedule(this.props);
    });
  }

  componentWillReceiveProps(nextProps) {
    const { location: { pathname: oldPath } } = this.props;
    const { location: { pathname } } = nextProps;
    if (pathname !== oldPath) {
      this.setInitialTab(nextProps, async () => {
        if (this.scheduleExists()) {
          return;
        }
        await this.fetchSchedule(this.props);
      });
    }
  }

  scheduleExists = () => {
    const { followedShows } = this.props;
    const { day } = this.state;
    const dayValue = routes[day];
    return !!followedShows[dayValue];
  };

  fetchSchedule = async (props) => {
    try {
      await getFollowedShows(props.dispatch, routes[this.state.day]);
    }
    catch (e) {
      console.log(e);
    }
  };

  handleChange = (event, value) => {
    this.pushRoute(value);
  };

  handleSwipeChange = (value) => {
    this.pushRoute(value);
  };

  pushRoute = (value) => {
    if (value === this.state.day) {
      return;
    }
    const { match, history } = this.props;
    this.setState({ day : value });
    history.push(`${match.url}/${routes[value]}`);
  };

  setInitialTab = (props, cb) => {
    const { location } = props;
    Object.keys(routes).forEach((route) => {
      if (location.pathname.includes(routes[route])) {
        this.setState({ day: parseInt(route) }, cb);
      }
    });
  };

  render() {
    const { followedShows, ...other } = this.props;
    return (
      <View
        {...other}
        {...this.state}
        days={Object.values(routes)}
        showList={followedShows[routes[this.state.day]] || []}
        handleChange={this.handleChange}
        handleSwipeChange={this.handleSwipeChange}
      />
    );
  }
}

const mapStateToProps = ({ followedShows, shows }) => ({
  followedShows,
  shows
});

export default connect(mapStateToProps)(MyShows);
