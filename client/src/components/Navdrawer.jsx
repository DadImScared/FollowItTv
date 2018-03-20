
import React from 'react';

import { withStyles } from 'material-ui/styles';

import ResponsiveDrawer from './ResponsiveDrawer';
import styles from '../styles/Navdrawer.css';

const Navdrawer = ({ classes }) => (
  <ResponsiveDrawer drawerClasses={{ paper: classes.drawerPaper }}>
    <div className={classes.drawerPaper}>nav drawer here</div>
  </ResponsiveDrawer>
);

export default withStyles(styles)(Navdrawer);
