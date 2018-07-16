
import React, { Component } from 'react';

import moment from 'moment';
import { connect } from 'react-redux';

import {
  createFollowedShow,
  deleteFollowedShow
} from '../../actions/followedShows';
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
  queue = [];

  constructor(...args) {
    super(...args);
    this.state = {
      day: 0,
      undoData: {},
      isOpen: false
    };
  }

  componentDidMount() {
    this.setInitialTab(this.props);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { location: { pathname: oldPath } } = this.props;
    const { location: { pathname } } = nextProps;
    if (pathname !== oldPath) {
      this.setInitialTab(nextProps);
    }
  }

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

  setInitialTab = (props) => {
    const { location } = props;
    for(const route of Object.keys(routes)) {
      if (location.pathname.includes(routes[route])) {
        this.setState({ day: parseInt(route) });
        return;
      }
    }
  };

  unFollow = async (show) => {
    const { schedule: { days }, id } = show;
    const { dispatch } = this.props;
    this.setUndoData(show);
    await dispatch(deleteFollowedShow(days, id));
    if (this.state.isOpen) {
      this.clearSnackbar();
    }
    else {
      this.processQueue();
    }
  };

  undoAction = async () => {
    const { undoData: { show: { schedule: { days }, id } } } = this.state;
    const { dispatch } = this.props;
    await dispatch(createFollowedShow(days, id));
    this.clearSnackbar();
  };

  clearSnackbar = () => {
    this.setState({ isOpen: false });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.clearSnackbar();
  };

  setUndoData = (show) => {
    this.queue.push({
      show,
      key: moment().valueOf()
    });
  };

  processQueue = () => {
    if (this.queue.length) {
      this.setState({
        isOpen: true,
        undoData: this.queue.shift()
      });
    }
  };

  render() {
    return (
      <View
        {...this.props}
        {...this.state}
        days={Object.values(routes)}
        handleChange={this.handleChange}
        handleSwipeChange={this.handleSwipeChange}
        unFollow={this.unFollow}
        undoAction={this.undoAction}
        handleClose={this.handleClose}
        handleSnackbarExit={this.processQueue}
      />
    );
  }
}

const mapStateToProps = ({ scroll: { directionDown } }) => ({
  directionDown
});

export default connect(mapStateToProps)(MyShows);
