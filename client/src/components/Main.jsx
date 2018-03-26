
import React from 'react';

import { Switch, Route } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';

import Schedule from './Schedule';
import Register from './Register';
// import Schedule from './oldSchedule';
import styles from '../styles/Main.css';

export const Main = ({ classes }) => (
  <div className={classes.content}>
    <Switch>
      <Route
        path={'/schedule/:date?'}
        render={(props) => <Schedule {...props} />}
      />
      <Route
        path={'/register/'}
        render={(props) => <Register {...props} />}
      />
    </Switch>
  </div>
);

export default withStyles(styles)(Main);
