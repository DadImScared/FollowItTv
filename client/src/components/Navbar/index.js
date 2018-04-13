
import React from 'react';

import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { Link, withRouter } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Hidden from 'material-ui/Hidden';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';

import MenuIcon from 'material-ui-icons/Menu';

import { logOut } from '../../actions/users';
import LoggedInButtons from './LoggedInButtons';
import LoggedOutButtons from './LoggedOutButtons';
import styles from '../../styles/Navbar.css';

const Navbar = ({ classes, toggleNav, loggedIn, logOut }) => {
  const logOutUser = () => {
    Cookies.remove('token');
    logOut();
  };

  return (
    <AppBar color={'secondary'} className={classes.appBar}>
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <div>
          <Hidden mdUp>
            <IconButton color={'inherit'} onClick={toggleNav}>
              <MenuIcon />
            </IconButton>
          </Hidden>
        </div>
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
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = ({ users: { loggedIn } }) => ({
  loggedIn
});

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(logOut())
});

export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar)));
