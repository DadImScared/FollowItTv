
import React from 'react';

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

const Base = ({ classes, ...other }) => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline/>
    <div className={classes.appFrame}>
      <Navbar />
      <Navdrawer />
      <Main {...other} />
    </div>
  </MuiThemeProvider>
);

export default withStyles(styles)(Base);
