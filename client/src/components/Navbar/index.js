
import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { Link, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';

import { logOut } from '../../actions/users';
import LoggedInButtons from './LoggedInButtons';
import LoggedOutButtons from './LoggedOutButtons';
import MoreOptions from './MoreOptions';
import Searchbar from './Searchbar';
import styles from '../../styles/Navbar.css';

export const Navbar = ({ classes, loggedIn, logOut, directionDown, ...other }) => {
  const logOutUser = () => {
    Cookies.remove('token');
    logOut();
  };

  return (
    <AppBar
      color={'secondary'}
      className={classes.appBar}
      classes={{
        root: classNames({
          [classes.hideNavBar]: directionDown,
          [classes.showNavBar]: !directionDown
        })
      }}
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
                <LoggedInButtons logOut={logOutUser} />
                :
                <LoggedOutButtons/>
            }
          </div>
        </Hidden>
        <Hidden mdUp>
          <div>
            <MoreOptions {...other} logOut={logOutUser} loggedIn={loggedIn} />
          </div>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  classes: PropTypes.shape({
    appBar: PropTypes.string.isRequired,
    hideNavBar: PropTypes.string.isRequired,
    showNavBar: PropTypes.string.isRequired
  }).isRequired,
  loggedIn: PropTypes.bool.isRequired,
  directionDown: PropTypes.bool.isRequired,
  logOut: PropTypes.func.isRequired
};

const mapStateToProps = ({ users: { loggedIn } }) => ({
  loggedIn
});

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(logOut())
});

export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar)));
