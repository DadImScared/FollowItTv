
import React from 'react';

import { Route } from 'react-router-dom';

import SwipeableViews from 'react-swipeable-views';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';

import ShowList from './ShowList';


const View = ({ days, showList, shows, handleChange, handleSwipeChange, day, match }) => (
  <Paper style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <AppBar position={'sticky'}>
      <Toolbar>
        <Tabs
          scrollable
          scrollButtons="auto"
          fullWidth
          value={day}
          onChange={handleChange}
        >
          {
            days.map((item, index) => (
              <Tab label={item} key={`${item}-${index}`} />
            ))
          }
        </Tabs>
      </Toolbar>
    </AppBar>
    <SwipeableViews
      style={{ flexGrow: 1 }}
      index={day}
      onChangeIndex={handleSwipeChange}
    >
      {
        days.map((item, index) => (
          <Route
            exact
            path={
              item === 'All' ?
                `(${match.url}|${match.url}/All)`
                :
                `${match.url}/${item}`
            }
            render={() => <ShowList showList={showList} shows={shows} />}
            key={`${item}-${index}-route`}
          />
        ))
      }
    </SwipeableViews>
  </Paper>
);

export default View;
