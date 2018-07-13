
import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getFollowedShows, unfollowShow, followShow, postFollow } from '../../actions/followedShows';
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
      day: 0,
      undoData: {
        showId: null,
        showDays: []
      },
      isOpen: false
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

  UNSAFE_componentWillReceiveProps(nextProps) {
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
    const { followedShows, followedShowsById } = this.props;
    const { day } = this.state;
    if (day === 0) {
      return followedShowsById.length;
    }
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
    for(const route of Object.keys(routes)) {
      if (location.pathname.includes(routes[route])) {
        this.setState({ day: parseInt(route) }, cb);
        return;
      }
    }
    cb();
  };

  unFollow = async (days, id) => {
    if (this.state.isOpen) {
      clearTimeout(this.timeout);
      this.clearSnackbar();
      // time is theme.duration.leavingScreen
      this.timeout = setTimeout(async () => {
        await this.makeRequest(this.props.unfollowShow, days, id);
        this.setUndoData(days, id);
      }, 195);
    }
    else {
      await this.makeRequest(this.props.unfollowShow, days, id);
      this.setUndoData(days, id);
    }
  };

  undoAction = async () => {
    const { undoData: { showId, showDays } } = this.state;
    await this.makeRequest(this.props.followShow, showDays, showId);
    this.clearSnackbar();
  };

  clearSnackbar = () => {
    this.setState({
      isOpen: false,
      undoData: {
        showId: null,
        showDays: []
      }
    });
  };

  setUndoData = (days, id) => {
    this.setState({
      undoData: {
        showId: id,
        showDays: days
      },
      isOpen: true
    });
  };

  makeRequest = async (cb, days, id) => {
    try {
      await postFollow(id);
      cb(days, id);
    }
    catch (e) {
      // show error message
      console.log(e);
    }
  };

  render() {
    const { followedShows, followedShowsById, ...other } = this.props;
    return (
      <View
        {...other}
        {...this.state}
        days={Object.values(routes)}
        handleChange={this.handleChange}
        handleSwipeChange={this.handleSwipeChange}
        unFollow={this.unFollow}
        undoAction={this.undoAction}
        handleClose={this.clearSnackbar}
      />
    );
  }
}

const mapStateToProps = ({ followedShows, shows, followedShowsById, scroll: { directionDown } }) => ({
  followedShows,
  followedShowsById,
  shows,
  directionDown
});

const mapDispatchToProps = (dispatch) => {
  const boundActions = bindActionCreators({
    followShow,
    unfollowShow
  }, dispatch);
  return {
    ...boundActions,
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyShows);
