
import React from 'react';

import { withStyles } from 'material-ui/styles';

import ResponsiveDrawer from '../ResponsiveDrawer';
import LiveSchedule from './LiveSchedule';
import styles from '../../styles/Navdrawer.css';


const View = ({ classes }) => (
  <ResponsiveDrawer drawerClasses={{ paper: classes.drawerPaper }}>
    <div style={{ position: 'fixed' }} className={classes.drawerPaper}>
      <LiveSchedule />
    </div>
  </ResponsiveDrawer>
);

export default withStyles(styles)(View);
