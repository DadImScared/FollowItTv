
import  React from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import styles from '../styles/HideNav.css';

const HideNav = ({ classes, directionDown, children }) => (
  <AppBar
    className={classNames(classes.appBar, {
      [classes.stickyDown]: directionDown,
      [classes.stickyUp]: !directionDown
    })}
    color={'secondary'}
    position={'sticky'}
  >
    {children}
  </AppBar>
);

HideNav.propTypes = {
  classes: PropTypes.shape({
    appBar: PropTypes.string.isRequired,
    stickyDown: PropTypes.string.isRequired,
    stickyUp: PropTypes.string.isRequired
  }).isRequired,
  directionDown: PropTypes.bool.isRequired
};

export default withStyles(styles)(HideNav);
