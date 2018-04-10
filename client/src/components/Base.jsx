
import React, { Component } from 'react';

import cyan from 'material-ui/colors/cyan';
import deepPurple from 'material-ui/colors/deepPurple';
import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles';
import CssBaseline from 'material-ui/CssBaseline';

import Navbar from './Navbar';
import Navdrawer from './Navdrawer';
import Main from './Main';

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

export default withStyles(styles)(Base);
