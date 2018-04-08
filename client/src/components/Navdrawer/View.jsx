
import React from 'react';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';

import ResponsiveDrawer from '../ResponsiveDrawer';
import LiveSchedule from './LiveSchedule';
import { Navdrawer as styles } from '../../styles/Navdrawer';


const View = ({ classes }) => (
  <ResponsiveDrawer drawerClasses={{ paper: classes.drawerPaper }}>
    <div style={{ position: 'fixed' }} className={classes.drawerPaper}>
      <div className={classes.drawerHeader}>
        <Typography className={classes.drawerHeaderTitle}>
          FollowIt
        </Typography>
      </div>
      <Divider className={classes.divider} />
      <LiveSchedule />
    </div>
  </ResponsiveDrawer>
);

export default withStyles(styles)(View);
