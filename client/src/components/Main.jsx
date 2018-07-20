
import React from 'react';

import { Switch, Route } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';

import Schedule from './Schedule';
import Register from './Register';
import Login from './Login';
import Logout from './Logout';
import Show from './Show';
import Search from './Search';
import MyShows from './MyShows';

import RouteWrapper from './RouteWrapper';

import styles from '../styles/Main.css';

export const Main = ({ classes }) => (
  <div className={classes.content}>
    <Switch>
      <RouteWrapper path={'/register'} Component={Register}/>
      <RouteWrapper path={'/login'} Component={Login}/>
      <RouteWrapper path={'/my_shows'} Component={MyShows} />
      <RouteWrapper path={'/schedule/:date?'} Component={Schedule}/>
      <Route path={'/show/:showId'} component={Show}/>
      <RouteWrapper path={'/search/:query'} Component={Search}/>
      <Route path={'/logout'} component={Logout}/>
    </Switch>
    <Hidden mdUp>
      <div style={{ height: '48px', backgroundColor: 'white' }} />
    </Hidden>
  </div>
);

export default withStyles(styles)(Main);
