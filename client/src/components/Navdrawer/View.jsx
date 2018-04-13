
import React from 'react';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import SvgIcon from 'material-ui/SvgIcon';

import Television from 'mdi-material-ui/Television';
import TelevisionBox from 'mdi-material-ui/TelevisionBox';

import ResponsiveDrawer from '../ResponsiveDrawer';
import LiveSchedule from './LiveSchedule';
import { Navdrawer as styles } from '../../styles/Navdrawer';


const View = ({ classes, isOpen, toggleNav }) => (
  <ResponsiveDrawer handleClose={toggleNav} isOpen={isOpen} drawerClasses={{ paper: classes.drawerPaper }}>
    <div style={{ position: 'fixed' }} className={classes.drawerPaper}>
      <div className={classes.drawerHeader}>
        <Typography className={classes.drawerHeaderTitle}>
          FollowIt
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center', position: 'relative', justifyContent: 'center' }}>
          <div style={{ position: 'absolute' }}>
            <SvgIcon
              style={{
                color: 'white',
                fontSize: '20px'
              }}
            >
              <TelevisionBox/>
            </SvgIcon>
          </div>
          <SvgIcon style={{ fontSize: '36px', color: 'white' }}>
            <Television/>
          </SvgIcon>
        </div>
      </div>
      <Divider className={classes.divider} />
      <LiveSchedule />
    </div>
  </ResponsiveDrawer>
);

export default withStyles(styles)(View);
