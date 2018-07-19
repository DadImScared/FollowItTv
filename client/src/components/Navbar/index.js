
import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';

import LoggedInButtons from './LoggedInButtons';
import LoggedOutButtons from './LoggedOutButtons';
import MoreOptions from './MoreOptions';
import Searchbar from './Searchbar';
import styles from '../../styles/Navbar.css';

export const Navbar = ({ classes, loggedIn, directionDown, ...other }) => {
  return (
    <AppBar
      color={'secondary'}
      className={classNames(classes.appBar, {
        [classes.hideNavBar]: directionDown
      })}
    >
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <Hidden smUp>
          <div />
        </Hidden>
        <div>
          <Searchbar {...other} />
        </div>
        <Hidden smDown>
          <div style={{ display: 'flex' }}>
            <Button component={Link} to={'/schedule'}>
              Schedule
            </Button>
            {
              loggedIn ?
                <LoggedInButtons />
                :
                <LoggedOutButtons/>
            }
          </div>
        </Hidden>
        <Hidden mdUp>
          <div>
            <MoreOptions {...other} loggedIn={loggedIn} />
          </div>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  classes: PropTypes.shape({
    appBar: PropTypes.string.isRequired,
    hideNavBar: PropTypes.string.isRequired
  }).isRequired,
  loggedIn: PropTypes.bool.isRequired,
  directionDown: PropTypes.bool.isRequired
};

const mapStateToProps = ({ users: { loggedIn } }) => ({
  loggedIn
});

export default withStyles(styles)(withRouter(connect(mapStateToProps)(Navbar)));
