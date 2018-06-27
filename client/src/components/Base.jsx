
import React, { Component } from 'react';

import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import cyan from '@material-ui/core/colors/cyan';
import deepPurple from '@material-ui/core/colors/deepPurple';
import withWidth from '@material-ui/core/withWidth';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Navbar from './Navbar';
import Navdrawer from './Navdrawer';
import Main from './Main';
import BottomNav from './BottomNav';

import { getFollowedShows } from '../actions/followedShows';
import { updateScroll } from '../actions/scroll';
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
      isOpen: false
    };
  }

  async componentDidMount() {
    this.lastScrollTop = 0;
    window.addEventListener('scroll', this.scrollListener);
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
    const { directionDown, bottomOfPage, dispatch } = this.props;
    const newState = {};
    if (scrollTop > this.lastScrollTop) { // scroll down
      if (!directionDown) {
        newState.directionDown = true;
      }
      if (this.atBottomOfPage() && !bottomOfPage) {
        newState.bottomOfPage = true;
      }
    }
    else { // scroll up
      if (directionDown) {
        newState.directionDown = false;
        newState.bottomOfPage = false;
      }
    }
    this.lastScrollTop = scrollTop;
    if (Object.keys(newState).length) dispatch(updateScroll(newState));
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
    return (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 2;
  };

  render() {
    const { classes, directionDown, bottomOfPage, ...other } = this.props;
    const { isOpen } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline/>
        <div className={classes.appFrame}>
          <Navbar
            toggleNav={this.toggleNavdrawer}
            directionDown={directionDown}
          />
          <Navdrawer toggleNav={this.toggleNavdrawer} isOpen={isOpen} />
          <Main {...other} />
          <BottomNav
            navDrawerOpen={isOpen}
            toggleNavdrawer={this.toggleNavdrawer}
            {...other}
            directionDown={directionDown}
            bottomOfPage={bottomOfPage}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = ({ scroll }) => ({
  ...scroll
});

export default withWidth()(withStyles(styles)(withRouter(connect(mapStateToProps)(Base))));
