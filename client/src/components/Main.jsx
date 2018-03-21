
import React from 'react';

import { Switch, Route } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';

import Schedule from './Schedule';
import styles from '../styles/Main.css';

export const Main = ({ classes }) => (
  <div className={classes.content}>
    <Switch>
      <Route
        path={'/schedule'}
        render={(props) => <Schedule {...props} />}
      />
    </Switch>
  </div>
);

export default withStyles(styles)(Main);
