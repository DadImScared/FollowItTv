
import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import cyan from 'material-ui/colors/cyan';
import deepPurple from 'material-ui/colors/deepPurple';
import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles';
import CssBaseline from 'material-ui/CssBaseline';

import Navbar from './Navbar';
import Navdrawer from './Navdrawer';
import Main from './Main';

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
      isOpen: false
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

  render() {
    const { classes, ...other } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline/>
        <div className={classes.appFrame}>
          <Navbar toggleNav={this.toggleNavdrawer} />
          <Navdrawer toggleNav={this.toggleNavdrawer} isOpen={this.state.isOpen} />
          <Main {...other} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(withRouter(connect()(Base)));
