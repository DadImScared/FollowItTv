
import React from 'react';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';

import styles from '../styles/Navbar.css';

const Navbar = ({ classes }) => (
  <AppBar className={classes.appBar}>
    <Toolbar>
      toolbar stuff here
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(Navbar);
