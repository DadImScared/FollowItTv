
import React from 'react';

import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles';
import CssBaseline from 'material-ui/CssBaseline';

import Navbar from './Navbar';
import Navdrawer from './Navdrawer';
import Main from './Main';

import styles from '../styles/Base.css';

const theme = createMuiTheme();

const Base = ({ classes }) => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline/>
    <div className={classes.appFrame}>
      <Navbar />
      <Navdrawer />
      <Main />
    </div>
  </MuiThemeProvider>
);

export default withStyles(styles)(Base);
