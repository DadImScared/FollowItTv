
import React from 'react';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Hidden from 'material-ui/Hidden';
import IconButton from 'material-ui/IconButton';

import MenuIcon from 'material-ui-icons/Menu';

import styles from '../styles/Navbar.css';

const Navbar = ({ classes, toggleNav }) => (
  <AppBar color={'secondary'} className={classes.appBar}>
    <Toolbar>
      <Hidden mdUp>
        <IconButton color={'inherit'} onClick={toggleNav}>
          <MenuIcon />
        </IconButton>
      </Hidden>
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(Navbar);
