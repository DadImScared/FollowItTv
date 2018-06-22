
import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { addShow, getShow } from '../../actions/shows';
import View from './View';


const routes = {
  0: 'general',
  1: 'seasons',
  2: 'cast',
  3: 'crew'
};


export class Show extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      currentTab: 0
    };
  }

  async componentDidMount() {
    const { shows, addShow } = this.props;
    this.setInitialTab(this.props);
    const showId = this.getShowId(this.props);
    if (shows[showId]) {
      return;
    }
    try {
      const { data } = await getShow(showId);
      addShow(data.id, { ...data });
    }
    catch ({ response: { data, status } }) {
      console.log(status, data);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { location: { pathname: oldPath } } = this.props;
    const { location: { pathname } } = nextProps;
    if (pathname !== oldPath) {
      this.setInitialTab(nextProps);
    }
  }

  setInitialTab = (props) => {
    const { location } = props;
    Object.keys(routes).forEach((route) => {
      if (location.pathname.includes(routes[route])) {
        this.setState({ currentTab: parseInt(route) });
      }
    });
  };

  getShowId = (props) => {
    return props.match.params.showId;
  };

  handleChange = (event, value) => {
    this.pushRoute(value);
  };

  handleChangeIndex = (value) => {
    this.pushRoute(value);
  };

  pushRoute = (value) => {
    if (value === this.state.currentTab) {
      return;
    }
    const { match, history } = this.props;
    this.setState({ currentTab : value });
    history.push(`${match.url}/${routes[value]}`);
  };

  render() {
    const { shows, ...other } = this.props;
    const showId = this.getShowId(this.props);
    return (
      <View
        {...other}
        {...this.state}
        showId={showId}
        show={shows[showId] || {}}
        handleChange={this.handleChange}
        handleChangeIndex={this.handleChangeIndex}
      />
    );
  }
}

const mapStateToProps = ({ shows }) => ({
  shows
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addShow
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Show);
