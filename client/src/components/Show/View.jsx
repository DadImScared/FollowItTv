
import React from 'react';

import { Route } from 'react-router-dom';

import SwipeableViews from 'react-swipeable-views';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';

import FollowShowButton from '../FollowShowButton';
import General from './General';
import Seasons from './Seasons';
import { Show as styles } from '../../styles/Show';


export const View = ({ handleChange, handleChangeIndex, currentTab, show, match, classes }) => (
  <Paper style={{ height: '100%', display: 'flex', flexDirection: 'column', marginBottom: '25px' }}>
    <div style={{ height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px' }}>
      <Typography variant={'title'}>
        {show.name}
      </Typography>
    </div>
    <AppBar style={{ top: '56px' }} position={'sticky'} color={'secondary'}>
      <FollowShowButton
        showId={show.id}
        buttonProps={{ variant: 'fab', className: classes.button, color: 'primary' }}
        fab={true}
        iconProps={{ style: { display: 'flex' } }}
      />
      <Tabs
        classes={{ flexContainer: classes.flexContainer }}
        value={currentTab}
        onChange={handleChange}
        indicatorColor={'primary'}
        textColor={'inherit'}
        fullWidth
      >
        <Tab label="General" />
        <Tab label="Seasons" />
        <Tab label="Cast" />
        <Tab label="Crew" />
      </Tabs>
    </AppBar>
    <SwipeableViews
      style={{ flexGrow: 1 }}
      onChangeIndex={handleChangeIndex}
      index={currentTab}
    >
      <Route
        exact
        path={`(${match.url}|${match.url}/general)`}
        render={() => (
          <General show={show} />
        )}
      />
      <Route
        path={`${match.url}/seasons`}
        render={() => (
          <Seasons show={show} />
        )}
      />
      <Typography>Item Three</Typography>
      <Typography>Item Four</Typography>
    </SwipeableViews>
  </Paper>
);

export default withStyles(styles)(View);
