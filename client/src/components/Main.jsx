
import React from 'react';

import { Switch, Route } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';

import Schedule from './Schedule';
import Register from './Register';
import Login from './Login';
import Show from './Show';
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
        path={'/schedule/:date?'}
        render={(props) => <Schedule {...props} />}
      />
      <Route
        path={'/show/:showId'}
        component={Show}
      />
    </Switch>
  </div>
);

export default withStyles(styles)(Main);
