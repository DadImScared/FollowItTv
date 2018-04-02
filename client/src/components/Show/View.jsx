
import React from 'react';

import { Route } from 'react-router-dom';

import SwipeableViews from 'react-swipeable-views';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';

import General from './General';
import Seasons from './Seasons';


const View = ({ handleChange, handleChangeIndex, currentTab, show, match }) => (
  <Paper style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <div style={{ height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px' }}>
      <Typography variant={'title'}>
        {show.name}
      </Typography>
    </div>
    <AppBar style={{ top: '56px' }} position={'sticky'} color={'secondary'}>
      <Tabs
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

export default View;
