
import React from 'react';

import { Route } from 'react-router-dom';

import SwipeableViews from 'react-swipeable-views';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import Waypoint from 'react-waypoint';

import FollowShowButton from '../FollowShowButton';
import Cast from './Cast';
import Crew from './Crew';
import General from './General';
import Seasons from './Seasons';
import HideNav from '../HideNav';
import { Show as styles } from '../../styles/Show';

export const View = ({
  handleChange,
  handleChangeIndex,
  currentTab,
  show,
  match,
  classes,
  showId,
  directionDown,
  bottomOfPage,
  onEnter,
  onLeave,
  isSticky
}) => (
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <Waypoint topOffset={'98'} onEnter={onEnter} onLeave={onLeave}>
      <div style={{ height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px' }}>
        <Typography variant={'title'}>
          {show.name}
        </Typography>
      </div>
    </Waypoint>
    <HideNav directionDown={directionDown}>
      <FollowShowButton
        directionDown={directionDown}
        showId={show.id}
        buttonProps={{
          variant: 'fab',
          className: classNames(classes.button, {
            [classes.slideUpButton]: !directionDown || bottomOfPage,
            [classes.buttonColorSticky]: isSticky
          }),
          color: 'primary'
        }}
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
    </HideNav>
    <SwipeableViews
      style={{ height: '100%' }}
      onChangeIndex={handleChangeIndex}
      index={currentTab}
      containerStyle={{ height: '100%' }}
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
          <Seasons show={show} showId={showId} />
        )}
      />
      <Route
        path={`${match.url}/cast`}
        render={() => (
          <Cast show={show} showId={showId} />
        )}
      />
      <Route
        path={`${match.url}/crew`}
        render={() => (
          <Crew showId={showId} />
        )}
      />
    </SwipeableViews>
  </div>
);

export default withStyles(styles)(View);
