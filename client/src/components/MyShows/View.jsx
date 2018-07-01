
import React from 'react';

import { Route } from 'react-router-dom';

import SwipeableViews from 'react-swipeable-views';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import HideNav from '../HideNav';
import ShowList from './ShowList';
import { View as styles } from '../../styles/MyShows';


const View = ({
  classes,
  days,
  showList,
  shows,
  handleChange,
  handleSwipeChange,
  day,
  match,
  isOpen,
  undoData: { showId },
  unFollow,
  undoAction,
  handleClose,
  directionDown
}) => (
  <Paper style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <HideNav directionDown={directionDown}>
      <Tabs
        scrollable
        scrollButtons="auto"
        value={day}
        onChange={handleChange}
        classes={{
          flexContainer: classes.flexContainer
        }}
      >
        {
          days.map((item, index) => (
            <Tab label={item} key={`${item}-${index}`} />
          ))
        }
      </Tabs>
    </HideNav>
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
            render={() => <ShowList unFollow={unFollow} showList={showList} shows={shows} />}
            key={`${item}-${index}-route`}
          />
        ))
      }
    </SwipeableViews>
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      open={isOpen}
      onClose={handleClose}
      message={`Un followed ${shows[showId] && shows[showId].name}`}
      action={(
        <Button onClick={undoAction}>
          Undo
        </Button>
      )}
    />
  </Paper>
);

export default withStyles(styles)(View);
