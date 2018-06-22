
import React from 'react';

import { Switch, Route } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

import Schedule from './Schedule';
import Register from './Register';
import Login from './Login';
import Show from './Show';
import Search from './Search';
import MyShows from './MyShows';

import styles from '../styles/Main.css';

export const Main = ({ classes }) => (
  <div className={classes.content}>
    <Switch>
      <Route
        path={'/register/'}
        render={(props) => <Register {...props} />}
      />
      <Route
        path={'/login/'}
        render={(props) => <Login {...props} />}
      />
      <Route
        path={'/my_shows'}
        render={(props) => <MyShows {...props} />}
      />
      <Route
        path={'/schedule/:date?'}
        render={(props) => <Schedule {...props} />}
      />
      <Route
        path={'/show/:showId'}
        component={Show}
      />
      <Route
        path={'/search/:query'}
        render={(props) => <Search {...props} />}
      />
    </Switch>
  </div>
);

export default withStyles(styles)(Main);
