
import React, { Component } from 'react';

import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import cyan from 'material-ui/colors/cyan';
import deepPurple from 'material-ui/colors/deepPurple';
import withWidth from 'material-ui/utils/withWidth';
import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles';
import CssBaseline from 'material-ui/CssBaseline';

import Navbar from './Navbar';
import Navdrawer from './Navdrawer';
import Main from './Main';
import BottomNav from './BottomNav';

import { getFollowedShows } from '../actions/followedShows';
import styles from '../styles/Base.css';

const theme = createMuiTheme({
  palette: {
    primary: cyan,
    secondary: deepPurple
  }
});

export class  Base extends Component {

  constructor(...args) {
    super(...args);
    this.state = {
      isOpen: false,
      lastScrollTop: 0,
      directionDown: false,
      bottomOfPage: false
    };
  }

  async componentDidMount() {
    try {
      await getFollowedShows(this.props.dispatch);
    }
    catch ({ response: { data, status } }) {
      if (status === 401) {
        // do nothing if users token expired or is wrong
        return;
      }
      console.log(data);
      console.log(status);
    }
  }

  toggleNavdrawer = () => {
    this.setState((prevState => ({ isOpen: !prevState.isOpen })));
  };

  toggleHideNavBars = (scrollTop) => {
    const { lastScrollTop, directionDown, bottomOfPage } = this.state;
    if (scrollTop > lastScrollTop) { // scroll down
      if (!directionDown) {
        this.setState({ directionDown: true });
      }
      if (this.atBottomOfPage() && !bottomOfPage) {
        this.setState({ bottomOfPage: true });
      }
    }
    else { // scroll up
      if (directionDown) {
        this.setState({ directionDown: false, bottomOfPage: false });
      }
    }
    this.setState({ lastScrollTop: scrollTop });
  };

  handleScroll = () => {
    const { width } = this.props;
    const scrollTop = this.getScrollTop();
    switch(width) {
    case 'xs':
    case 'sm':
    case 'md':
      this.toggleHideNavBars(scrollTop);
      break;
    default:
      return;
    }
  };

  scrollListener = _.throttle(this.handleScroll, 200);

  getScrollTop = () => {
    const docEl = document.documentElement;
    return (window.pageYOffset || docEl.scrollTop) - (docEl.clientTop || 0);
  };

  atBottomOfPage = () => {
    const isAtBottom = (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 2;
    this.setState({ bottomOfPage: isAtBottom });
  };

  render() {
    const { classes, ...other } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline/>
        <div className={classes.appFrame}>
          <Navbar toggleNav={this.toggleNavdrawer} />
          <Navdrawer toggleNav={this.toggleNavdrawer} isOpen={this.state.isOpen} />
          <Main {...other} />
          <BottomNav />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withWidth()(withStyles(styles)(withRouter(connect()(Base))));
