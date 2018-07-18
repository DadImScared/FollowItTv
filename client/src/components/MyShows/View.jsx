
import React from 'react';

import SwipeableViews from 'react-swipeable-views';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import HideNav from '../HideNav';
import ShowRoute from './ShowRoute';
import { View as styles } from '../../styles/MyShows';

const View = ({
  classes,
  days,
  handleChange,
  handleSwipeChange,
  day,
  match,
  isOpen,
  undoData: { show = {}, key },
  unFollow,
  undoAction,
  handleClose,
  directionDown,
  handleSnackbarExit
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
          <ShowRoute day={item} key={`${item}-${index}`} unFollow={unFollow} match={match} />
        ))
      }
    </SwipeableViews>
    <Snackbar
      key={key}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      open={isOpen}
      onClose={handleClose}
      onExited={handleSnackbarExit}
      autoHideDuration={6000}
      message={`Un followed ${show.name}`}
      action={(
        <Button onClick={undoAction}>
          Undo
        </Button>
      )}
    />
  </Paper>
);

export default withStyles(styles)(View);
